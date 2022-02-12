import React, { useEffect } from "react";

import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
// import { useCookies } from "react-cookie";

const GoogleAuthCallback: React.FC = () => {
  const router = useNavigate();
  const location = useLocation();
  const url = process.env.REACT_APP_API;

  // eslint-disable-next-line no-unused-vars
  // const [cookie, setcookie] = useCookies(["datacookie"]);
  //   useEffect(() => {
  //     if (!location) {
  //       return;
  //     }
  //     const { search } = location;
  //     axios
  //       .get(`http://localhost:1337/api/auth/google/callback?${search}`)

  //       .then((res) => {
  //         const data = JSON.stringify(res.data);
  //         const datatoken = JSON.stringify(res.data.jwt);
  //         console.log(data);

  //         console.log(datatoken);
  //         // alert("aaa");

  //         //  axios
  //         //   .get(http://localhost:1337/api/tests, {
  //         //     headers: {
  //         //       Authorization: "Bearer " + datatoken,
  //         //     },
  //         //   })
  //         //     .then((res)=>{
  //         //       alert("Login Sucsess");

  //         //     })
  //         //     .catch(() => {
  //         //       alert("Login Failure");
  //         //       // setIsAuth(false);
  //         //     });
  //       });
  //     // .then(setAuth)
  //   }, [location]);

  useEffect(() => {
    async function run(): Promise<void> {
      if (!location) {
        return;
      }
      const { search } = location;
      const jwt = await axios
        .get(`${url}/api/auth/google/callback?${search}`)

        .then((res) => {
          const data = JSON.stringify(res.data);
          const datatoken = JSON.stringify(res.data.jwt).replaceAll(`"`, "");
          console.log(data);

          console.log(datatoken);
          return { datatoken, data };
          // alert("aaa");
        });
      await axios
        .get(`${url}/api/auths`, {
          headers: {
            Authorization: "Bearer " + jwt.datatoken
          }
        })
        .then((res) => {
          //   localStorage.setItem("datalocalstorage", jwt.data);
          //   setcookie("datacookie", jwt.datatoken);
          alert("Login Sucsess");
          router("/Hello");
          return res;
        })
        .catch(() => {
          alert("เเจ้งแอดมิน");
          router("/");

          // setIsAuth(false);
        });
    }
    run();
  }, [location, router, url]);

  return (
    <div>
      <>
        <h1></h1>
      </>
    </div>
  );
};

export default GoogleAuthCallback;
