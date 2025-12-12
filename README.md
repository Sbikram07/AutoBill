#  AutoBill - Automated Supermarket Billing System

### AutoBill is a marketplace-style supermarket automation system. Customers upload or capture a basket image, and the application uses a YOLO segmentation model + ML services to:

* Detect fruits & vegetables

* Count items

* Fetch product details from the database

* Generate an automated bill

* Export bill as PDF

## Project Structure 

```bash 
AutoBill/
│
├── client/ # Frontend (React + Vite + Tailwind + ShadCN)
├── server/ # Backend (Node.js, Express, MongoDB, JWT)
└── ml_model/ # YOLO segmentation ML model + Python FastAPI service
```

## Quick Setup
### This guide explains how to install and run each component (client, server, ml model) locally.

## <b>1. Client (Frontend)</b>
 *  Pre-requisites:

    * Node.js
    * NPM

 * Install dependencies:
    ```bash
    cd client
    npm install
    ```

 * Run the app:
    ```bash
    npm run dev
    ```
 * Env variables(example `.env` file):
    ```bash   
    VITE_SERVER_URL=http://localhost:5000
    
    ```

## <b>2. Server (Backend)</b>
 *  Pre-requisites:

    * Node.js
    * NPM
    * mongoDB( *local or atlas*)

 * Install dependencies:
    ```bash
    cd server
    npm install
    ```
 * Create *.env* file   :
    ```bash
    MONGODB_URI=
    MODEL_URL=
    PORT=5000
    ```

 * Run the app:
    ```bash
    npm run dev
    ```

## <b>3. ML Model</b>
 *  Pre-requisites:

    * Python(3.1+)
    *pip

 * Install dependencies:
    ```bash
    cd ml_model
    pip install -r requirements.txt
    ```

 * Run the app:
    ```bash
    uvicorn app:app --host 0.0.0.0 --port 5001 --reload
    ```
    * Typical prediction endpoint: POST /predict which accepts file uploads and returns JSON with detections and counts.

## Wring the services together 

* Client calls the Node server (VITE_API_URL) for auth, uploads and bill actions.
* The Node server forwards images to the ML FastAPI server (ML_SERVER_URL).

* After inference, the server stores results, generates a bill and serves the PDF.


## Dev Workflow Tips 
- Run backend + ml server concurrently during dev.


## Contributing
We welcome contributions to this project! Please fork the repository and submit pull requests.

## License
This project is licensed under the MIT License

## Acknowledgments
We would like to express our gratitude to the developers of the YOLO model and FastAPI for their contributions to the project.

## Author 
[Bikram Sasmal](https://github.com/Sbikram07)<br>
 B.Tech in Computer Science and Engineering 