# WEB103 Project 4 - *Bolt Bucket*

Submitted by: **Thy Tran**

About this web app: **Bolt Bucket is a custom car builder. Users pick an exterior color, roof, wheels, and interior, and a live preview of the car and the total price update with every choice. Impossible combinations (like a convertible with rear entertainment screens) are blocked before you can pick them and rejected by the server if submitted anyway. Saved cars can be viewed, edited, and deleted. Data lives in a Render PostgreSQL database, served by an Express API and displayed with React.**

Time spent: **X** hours

## Required Features

The following **required** functionality is completed:

<!-- Make sure to check off completed functionality below -->
- [x] **The web app uses React to display data from the API.**
- [x] **The web app is connected to a PostgreSQL database, with an appropriately structured `CustomItem` table.**
  - [ ]  **NOTE: Your walkthrough added to the README must include a view of your Render dashboard demonstrating that your Postgres database is available**
  - [ ]  **NOTE: Your walkthrough added to the README must include a demonstration of your table contents. Use the psql command 'SELECT * FROM tablename;' to display your table contents.**
- [x] **Users can view **multiple** features of the `CustomItem` (e.g. car) they can customize, (e.g. wheels, exterior, etc.)**
- [x] **Each customizable feature has multiple options to choose from (e.g. exterior could be red, blue, black, etc.)**
- [x] **On selecting each option, the displayed visual icon for the `CustomItem` updates to match the option the user chose.**
- [x] **The price of the `CustomItem` (e.g. car) changes dynamically as different options are selected *OR* The app displays the total price of all features.**
- [x] **The visual interface changes in response to at least one customizable feature.**
- [x] **The user can submit their choices to save the item to the list of created `CustomItem`s.**
- [x] **If a user submits a feature combo that is impossible, they should receive an appropriate error message and the item should not be saved to the database.**
- [x] **Users can view a list of all submitted `CustomItem`s.**
- [x] **Users can edit a submitted `CustomItem` from the list view of submitted `CustomItem`s.**
- [x] **Users can delete a submitted `CustomItem` from the list view of submitted `CustomItem`s.**
- [x] **Users can update or delete `CustomItem`s that have been created from the detail page.**


The following **optional** features are implemented:

- [x] Selecting particular options prevents incompatible options from being selected even before form submission

The following **additional** features are implemented:

- [x] Every feature changes the CSS-drawn car preview: exterior paints the body, roof changes the cabin shape (hardtop, convertible, sunroof), wheels change the rim color, and interior changes the seat color
- [x] Incompatible options are greyed out with the reason shown next to them
- [x] The server re-checks every combo and recalculates the price, so an impossible car can't be saved even by calling the API directly
- [x] Options are stored in their own `options` table, so prices and choices can change without touching the code
- [x] Responsive layout that stacks the preview above the form on small screens

## Video Walkthrough

Here's a walkthrough of implemented required features:

<img src='assets/walkthrough.gif' title='Video Walkthrough' width='' alt='Video Walkthrough' />

<!-- Replace this with whatever GIF tool you used! -->
GIF created with [ScreenToGif](https://www.screentogif.com/)

## Notes

The database has two tables: `options` (every choice with its category, price, and preview color) and `cars` (each saved car, referencing its chosen options by id). Keeping options in their own table meant the form, preview, list, and detail pages could all be built from one API call instead of hard-coding the choices.

The trickiest part was connecting to Render from my laptop: Render's internal hostname (`dpg-...-a`) only works between Render services, so the `.env` needs the full external hostname ending in `.oregon-postgres.render.com`.

## License

Copyright 2026 Thy Tran

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

> http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
