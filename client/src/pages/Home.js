import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

function Home() {
  
  return (
    <div>
      <Formik>
      <Form className="formContainer2">
      <h1>Refer a Student in Need</h1>
      <p>We’re here to support you and the students you serve by providing clothing, hygiene, and other basic essentials to low income and homeless youth in need.</p>
      <br></br>
      <p><i>*Currently providing emergency, basic needs assistance to youth and school communities in Jacksonville and Palm Beach Florida.</i></p>
      <p>Please note that this referral is to be completed only by school/district staff or staff from other Social Service Agencies. This includes teachers,</p>
      <p>case managers, counselors, social workers, etc. The GCP is the bridge for connecting school communities with clothing, hygiene products and other</p>
      <p>basic essentials to ensure their low-income and homeless youth have access to these items throughout the school year.If you are a parent seeking</p>
      <p> help for your child, please reach out to the guidance counselor at your child’s school.</p>
     </Form>
     </Formik>
      </div>
  );
}

export default Home;
