## Contributing

### Project Context

The main purpose of Healio is to provide a more accessible and user-friendly experience for those that may be unfamiliar with patient portals.

Our main research insights found that major existing patient portals such as MyChart had information overload issues (cluttered design) and lacked responsiveness especially in regards to mobile devices,

After conducting user research, other factors that influenced our design were the need to make privacy and data consent guidelines clear, the addition of messaging features to easily communicate with a healthcare provider, and accessibility features such as language translation.

The code follows a Client Server architecture. All client-side rendering and interactivity are done via React. The server itself was built using Node.js and the Express framework. The server handles login and signup requests, which then calls the API to a MongoDB database where it stores user emails, HASHED passwords (encrypted using the `bcyrpt` library), and data associated with the specific user (such as medications, appointments, etc.)

Keep this information in mind once you begin to make contributions to this project.

### Guidelines

The project is licensed under the MIT License. If you fork this repository, the only condition is that you MUST preserve this copyright and license in the new project. While not explicity required, we do ask that you still give proper credit to our project developers if you reuse code from this project.

Since our team is stopping active development on this project after May 2022, we will not be reviewing and approving pull requests to merge into this repoistory.