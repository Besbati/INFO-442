# Requirements

## About Us Page

When a user navigates to the “About Us” page:

A1. The page must describe the problem the project addresses.

A2. The page must describe the project’s goal.


## Navigation Bar

When any user visits any page:

N1. Every page must contain a navigation bar.

N2. The navigation bar must include a link to the homepage.

N3. The navigation bar must display the project name.

N4. The navigation bar must include a link labeled “Explore.”

N5. The navigation bar must include a link labeled “FAQ.”

N6. The navigation bar must include a link labeled “About Us.”

After the user performs a search or navigates away from the initial home screen:

N7. The navigation bar must display the search bar.


## Home Page

When a user first loads the homepage:

H1. The page must display a search bar centered on the screen.

H2. The search bar must allow the user to enter a ZIP code or address.

H3. The page must display a radius selection dropdown next to the search bar.

H4. The radius dropdown must allow the user to select one of the following:
- 1 mile
- 5 miles
- 10 miles
- 25 miles
- 50 miles
- Custom size

If the user enters a custom size that isn't a whole number:

H5. The number entered must be rounded to the nearest whole number.


## Search

When a user submits a valid ZIP code or address:

S1. The system must display a map centered on the searched location.

S2. The system must display endangered species located within the selected radius.

S3. Each endangered species must be represented by an icon on the map.

S4. Each endangered species group must be shown by the same type of icon.

After a search is completed:

S4. The search bar must move from the center of the page to the navigation bar.


## Map

When the map is displayed:

M1. The map must allow the user to drag to navigate to different locations.

When endangered species are displayed on the map:

M3. Each species icon must be clickable.

M4. Clicking a species icon must highlight the corresponding species in the species list.

M5. Map must contain a message informing users about keyboard-accessible map pinning.

## Species List

When search results are displayed:

L1. The system must display a collapsible species list panel.

L2. The species list must be hidden by default.

L3. The user must be able to toggle the species list panel open and closed.

L4. The species list must group species by category:
- Plants
- Mammals
- Reptiles
- Fish
- Other animals

L5. Species within each category must be sorted alphabetically.

When a user selects a species from the list:

L6. The map must center on the selected species’ icon.


## Species Information

When a species is selected from the map or list:

I1. The system must display the species’ common name.

I2. The system must display the species’ scientific name.

I3. The system must display a description of the species.

I4. The system must display the species’ population information if available.

I5. The system must display the species’ level of endangerment.

I6. The system must display an image of the species.


## FAQ Info Page

When a user navigates to the “FAQ” page:

F1. The page must explain different levels of species endangerment.

F2. Each level of endangerment must include a description of its meaning.

F3. The page must include common questions about endangered animals.

F4. The page must include an answer to each question.


## Error Message

When a user submits a ZIP code or address:

ER1. If the entered ZIP code or address does not exist, the system must display an error message.

ER2. If the entered ZIP code or address is outside United States territory, the system must display an error message.


## Footer

F1. Every page must display a footer.


## Non-Function requirements

NF1. User location data must be deleted after 7 days.

NF2. Pinning map with arrow keys

