import { signInAnonymously, onAuthStateChanged } from "firebase/auth";
import {
  collection,
  addDoc,
  query,
  where,
  orderBy,
  getDocs,
  deleteDoc,
  doc,
  Timestamp,
} from "firebase/firestore";
import { auth, db } from "../firebase";

const SEARCHES_COLLECTION = "searches";
const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;

/**
 * Sign in anonymously and return the user's UID.
 * If already signed in, returns the current UID immediately.
 */
export const ensureAuth = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe();
      if (user) {
        resolve(user.uid);
      } else {
        signInAnonymously(auth)
          .then((credential) => resolve(credential.user.uid))
          .catch(reject);
      }
    });
  });
};

/**
 * Save a search to Firestore.
 * @param {Object} location - { lat, lng, name, cityState }
 * @param {number} radius - Search radius in miles
 * @param {number} speciesCount - Number of species found
 */
export const saveSearch = async (location, radius, speciesCount) => {
  try {
    const uid = await ensureAuth();

    await addDoc(collection(db, SEARCHES_COLLECTION), {
      uid,
      lat: location.lat,
      lng: location.lng,
      name: location.name || "",
      cityState: location.cityState || "",
      radius,
      speciesCount: speciesCount || 0,
      createdAt: Timestamp.now(),
    });
  } catch (error) {
    console.error("Error saving search to Firestore:", error);
  }
};

/**
 * Get recent searches for the current user (within the last 7 days).
 * Returns newest-first, limited to 10 entries.
 */
export const getRecentSearches = async () => {
  try {
    const uid = await ensureAuth();
    const cutoff = Timestamp.fromDate(new Date(Date.now() - SEVEN_DAYS_MS));

    const q = query(
      collection(db, SEARCHES_COLLECTION),
      where("uid", "==", uid),
      where("createdAt", ">", cutoff),
      orderBy("createdAt", "desc")
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map((d) => ({
      id: d.id,
      ...d.data(),
      createdAt: d.data().createdAt?.toDate(),
    }));
  } catch (error) {
    console.error("Error fetching recent searches:", error);
    return [];
  }
};

/**
 * Delete searches older than 7 days for the current user (NF1 requirement).
 */
export const cleanupOldSearches = async () => {
  try {
    const uid = await ensureAuth();
    const cutoff = Timestamp.fromDate(new Date(Date.now() - SEVEN_DAYS_MS));

    const q = query(
      collection(db, SEARCHES_COLLECTION),
      where("uid", "==", uid),
      where("createdAt", "<=", cutoff)
    );

    const snapshot = await getDocs(q);
    const deletions = snapshot.docs.map((d) =>
      deleteDoc(doc(db, SEARCHES_COLLECTION, d.id))
    );
    await Promise.all(deletions);

    if (deletions.length > 0) {
      console.log(`Cleaned up ${deletions.length} old search(es)`);
    }
  } catch (error) {
    console.error("Error cleaning up old searches:", error);
  }
};
