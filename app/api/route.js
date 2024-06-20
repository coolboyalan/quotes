import { NextResponse } from "next/server";
import axios from "axios";

function jsonToFormUrlEncoded(jsonData) {
  return Object.keys(jsonData)
    .map(
      (key) => encodeURIComponent(key) + "=" + encodeURIComponent(jsonData[key])
    )
    .join("&");
}

export async function POST(request) {
  try {
    const data = await request.json();

    const loginData = jsonToFormUrlEncoded(data);

    console.log(loginData)
      
    // Options for the fetch request
    const options = {
      method: "post",
      url: `${process.env.URL}/wp-login.php`,
      body: loginData,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };
    const response = await axios(options);
    console.log(response.data)
    return NextResponse.json({ status: true }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ status: false }, { status: 500 });
  }
}
