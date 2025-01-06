# NeuroLauncher: Physics EEG Launcher Project
The Playwright code is located in `tests/example.spec.js`.
The Arduino code is titled `NeuroLauncher.ino`. The Playwright code assumes this file to be located in a directory titled `~/NeuroLauncher`.

Dependencies: [Playwright](https://playwright.dev/), an automation library commonly used in browser testing/web scraping. I use it to access data from the [Neurosity](https://console.neurosity.co/) website.
* Will have to create a `.env` file storing your Neurosity Crown device ID, device name, email, and password (for the Neurosity website).

The project hardware comes from the Osoyoo [robot car kit](https://osoyoo.com/2020/05/12/v2-1-robot-car-kit-for-arduino-tutorial-introduction/#5); I repurposed the Arduino and motor driver, as well as one of the four gear motors and the WiFi shield to allow the system to run wirelessly if needed.

If you have any questions, contact me at rissha412@fusdk12.net.
