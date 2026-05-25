import axios from "axios";

// १. Axios चा एक सेंट्रलाइज्ड इन्स्टन्स (Instance) तयार करणे
const API = axios.create({
  // जर .env फाईलमध्ये लिंक नसेल, तर ते बाय-डिफॉल्ट localhost:5000 वापरेल
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api",
  timeout: 10000, // जर सर्व्हरने १० सेकंदात रिस्पॉन्स दिला नाही तर रिक्वेस्ट कॅन्सल होईल
  headers: {
    "Content-Type": "application/json",
  },
});

// २. Request Interceptor (भविष्यात ऍडमिन पॅनेलसाठी उपयुक्त)
// जेव्हा कधी तू ऍडमिन पॅनेलवरून प्रोजेक्ट अ‍ॅड/डिलीट करशील, तेव्हा टोकन ऑटोमॅटिक पाठवले जाईल
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("adminToken");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// ३. Response Interceptor (ग्लोबल एरर हँडलिंगसाठी)
// जर सर्व्हर डाऊन असेल किंवा काही एरर आली तर ती कन्सोलायझेशनमध्ये व्यवस्थित ट्रॅक होईल
API.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error Response:", error.response?.data || error.message);
    return Promise.reject(error);
  },
);

// ४. DEFAULT EXPORT (ज्यामुळे तुझी App.tsx मधील एरर निघून जाईल)
export default API;
