# italki.com teacher searcher
 
italki.com it's really cool platform which provides you to learn a language with a native speakers
 
## Problem
It provides inbuilt search but you can't sort teachers by their real lowest price. Seems to be it shows the teacher average hour price. Some teachers have 30 min and 45 min lessons but some teachers don't. So you should open each teacher profile then open each teacher lesson type and check the lowest price there
 
## Solution
By default the script searches English native speakers. If you want to modify some parameters please find it in the script constants at the beginning of the script.
### Way 1
1. Copy [`index-inline.js`](https://raw.githubusercontent.com/ilyademidow/italki-teacher-searcher/main/index-inline.js) content
1. Open https://italki.com in your browser
1. Type in the browser search bar `javascript:` and paste the copied content there and press `Enter` key <br/>
   ![search bar example](search-bar-example.png)
1. It looks like nothing happens but wait 30-45 sec (depends on your browser) and enjoy

### Way 2
1. Copy [`index.js`](https://raw.githubusercontent.com/ilyademidow/italki-teacher-searcher/main/index.js) content
1. Open https://italki.com in your browser
1. Open developer tools (usually press `F12`)
1. Open `Console` tab
1. Paste the copied script content
1. Press `Enter` key
1. Wait for 25 sec (depends on your internet speed) 
