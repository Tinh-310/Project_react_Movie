import axios from "axios";
import qs from "query-string";

// Setup những cấu hình mặc định cho axios
const axiosClient = axios.create({
  baseURL: "https://movienew.cybersoft.edu.vn/api/",
  headers: {
    TokenCybersoft:
     "TokenCybereyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAyNiIsIkhldEhhblN0cmluZyI6IjEzLzEwLzIwMjIiLCJIZXRIYW5UaW1lIjoiMTY2NTYxOTIwMDAwMCIsIm5iZiI6MTYzMzE5NDAwMCwiZXhwIjoxNjY1NzY2ODAwfQ.TMg-RWGpT6_kH-eG3Pbw5j_8yWUP84LrkWZAFj-Drfk.TMg-RWGpT6_kH-eG3Pbw5j_8yWUP84LrkWZAFj-Drfksoft",
  },
  // Override lại cách axios set params lên url
  paramsSerializer: (params) => {
    return qs.stringify(params, { skipEmptyString: true, skipNull: true });
  },
});

// Interceptor là một khái niệm "can thiệp vào một cái gì đó trong quá trình đến được đích đến của nó"
axiosClient.interceptors.response.use(
  (response) => {
    // interceptors sẽ nhận được response và có thể thay đổi nó trước khi trả ra cho nơi gọi axios

    // response.data là format của axios, sau đó .content là format của Cybersoft
    return response.data.content;
  },
  (error) => {
    // interceptors sẽ nhận được error và có thể thay đổi nó trước khi trả ra cho nơi gọi axios
    // Thêm Promise.reject để đảm bảo sẽ nhảy xuống catch tại nơi gọi axios
    return Promise.reject(error.response.data.content);
  }
);

export default axiosClient;
