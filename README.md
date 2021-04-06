# italki.com teacher search script

italki.com is an impressive online learning platform that helps you to learn a language from native speakers.

## Problem
By using the provided inbuilt search tool, you will encounter the following: Teachers can not be sorted by their "real" lowest price because it shows the teachers "average hour price"; Some teachers offer lessons with different durations (30 min, 45 min lesson etc.) while other 60 min and 90 min, so you have to open each teacher's profile then open each teacher's lesson type / package and then check the lowest lesson type / package price
 
## Solution
### Way 1
1. Copy [`index-inline.js`](https://raw.githubusercontent.com/ilyademidow/italki-teacher-searcher/main/index-inline.js) content
1. Open https://italki.com in your browser
1. Type in the browser search bar `javascript:` and paste the copied content there and press `Enter` key <br/>
   ![search bar example](search-bar-example.png)
1. Wait for 25 sec (depends on your internet speed) and enjoy

or

### Way 2
1. Copy [`index.js`](https://raw.githubusercontent.com/ilyademidow/italki-teacher-searcher/main/index.js) content
1. Open https://italki.com in your browser
1. Open developer tools (usually press `F12`)
1. Open `Console` tab
1. Paste the copied script content
1. Press `Enter` key
1. Wait for 25 sec (depends on your internet speed) and enjoy

By default the script searches English native speakers. If you want to modify some parameters please find it in the script constants at the beginning of the script.
