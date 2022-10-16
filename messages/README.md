# About LAB 8 - The Ride-Hailing Service - Part 1
  Using google API to display the map and add markers with customizing car icon.

# Collaborators
  - [Loi Truong](https://github.com/loitruong)


# Performance Optimization
Using regular 4G for thorrling
  - Before Optimize:
    - 1.54 MB Resources 
    - style.css = 89 B
    - script.js = 963 B
    - 10 hard refresh with average of 6.868s

  - After Optimize:
    - 1.54 MB Resources
    - style.css = 67 B
    - script.js = 604 B
    - 10 hard refresh with average of 6.937s

  - The most significant bottleneck is loading external google Maps javascript files. Although I make the files smaller than before, these are local files, so it only takes 40ms-80ms to load each file, which is way too small to see any difference. Maybe the performance will be different if the CSS/js files have come from another server instead of localhost.

  
# Number of working hours
  2.5 hours



