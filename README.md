## Stage 0 (Backend) API Integration & Data Processing

### Description
A Node.js-based RESTful API that integrates with the Genderize.io external service to classify gender based on a provided name. The system processes raw data to determine prediction confidence, transforms data keys, and provides standardized error handling.

### Features
* **Data Transformation:** Renames external API fields for internal consistency (e.g., `count` to `sample_size`).
* **Confidence Logic:** Implements an evaluation algorithm requiring $probability \ge 0.7$ and $sample\_size \ge 100$.
* **Strict Validation:** Handles missing parameters (400) and incorrect data types (422).
* **CORS Enabled:** Fully accessible for cross-origin grading scripts.

### Tech Stack
* **Runtime:** Node.js
* **Framework:** Express.js
* **HTTP Client:** Axios
* **Middleware:** CORS

### API Specification

#### 1. Classify Name
**Endpoint:** `GET /api/classify`  
**Query Parameters:**
* `name` (string, required): The name to be classified.

**Example Request:**
`GET https://<your-base-url>/api/classify?name=Ajiboye`

**Success Response (200 OK):**
```json
{
  "status": "success",
  "data": {
    "name": "Ajiboye",
    "gender": "male",
    "probability": 0.68,
    "sample_size": 1782,
    "is_confident": false,
    "processed_at": "2026-04-10T13:09:15.852Z"
  }
}
```

#### 2. Error Responses
**Missing Name (400 Bad Request):**
```json
{ "status": "error", "message": "Name parameter is required" }
```

**Invalid Input (422 Unprocessable Entity):**
```json
{ "status": "error", "message": "Name must be a string" }
```

**No Prediction Found (200/404):**
```json
{ "status": "error", "message": "No prediction available for the provided name" }
```

### Installation & Local Setup

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd <your-repo-folder>
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the server:**
   ```bash
   npm start
   ```
   The server will run on `http://localhost:3189`.

---

### Deployment Note
The API is live and publicly accessible at: **[INSERT YOUR LIVE RENDER/RAILWAY LINK HERE]**

---

### Final Polish Steps:
1.  **Check `.gitignore`:** Ensure your `.gitignore` contains `node_modules` so you don't push thousands of unnecessary files to GitHub.
2.  **Verify Link:** Paste your live URL into the README so the grader can find it immediately.
3.  **About the Math:** Since you are in Nigeria (WAT), ensure your `processed_at` timestamp is coming out in UTC format (which `.toISOString()` handles automatically).

You've done the hard work—congratulations on completing the task! Do you have any other questions before you submit?