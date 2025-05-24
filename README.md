# ☁️ Cloud Computing CH2-PS156 ☁️

<p>🚀 Our Cloud Computing member repository to manage backend and build API in to our CoffeeGit Project</p>
<p>We designing architecture for cloud system and build the environment to store the resource and provide server to do the process in google cloud service. We also create a database with MySQL for organizes, integrates, and control the output of processes on the server and create Rest Api with the Express and Flask framework to simplify communication between databases, machine learning, and Android to serve data output</p>

<H3>Infrastructure Project 🏢</H3>
<p>We use 3 services in <a href="https://cloud.google.com/free/?utm_source=google&utm_medium=cpc&utm_campaign=japac-ID-all-id-dr-BKWS-all-super-trial-EXA-dr-1605216&utm_content=text-ad-none-none-DEV_c-CRE_664989825089-ADGP_Hybrid+%7C+BKWS+-+EXA+%7C+Txt+~+GCP_General_core+brand_main-KWID_43700077139981276-kwd-26415313501&userloc_9126017-network_g&utm_term=KW_google+cloud+platform&gad_source=1&gclid=CjwKCAiApuCrBhAuEiwA8VJ6Jh6tNgkZJt9Qeb8Lv4B-j-Iq5qjKeixDFP02GCCIUe9cmGrZhLeJnBoCOn8QAvD_BwE&gclsrc=aw.ds&hl=en"><img src="https://img.shields.io/badge/Google_Cloud-4285F4?style=for-the-badge&logo=google-cloud&logoColor=white" width="70px"></a> Platform for manage this project, namely <a href="https://cloud.google.com/run?hl=en">Cloud Run</a> for deploy API, <a href="https://cloud.google.com/compute?hl=en">Compute Engine</a> for database MYSQL, and <a href="https://cloud.google.com/storage/?hl=en">Cloud Storage</a> for handle file user and app.</p>

<img src="https://github.com/BANGKIT-CH2-PS156/CC/blob/main/public/img/arsitektur.png" width=75%>

<h3>Design Database <img src="https://cdn3.emoji.gg/emojis/Database.png" width="20px" alt="Database"></h3>
<p>In this project we use RDBMS namely <a href="https://www.mysql.com/"><img src="https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white" width="50px"></a>. We make 5 table to handle data for this application. Also we design our database with <a href="https://dbdiagram.io/home"></a></p>

<img src="https://github.com/BANGKIT-CH2-PS156/CC/blob/main/public/img/erd.png" width=75%>

<!-- <img src="https://cdn-icons-png.flaticon.com/128/5432/5432492.png" width="70px"> -->
<h3>API Documentation 🗎 </h3>
<p>Our API Documentation build with <a href="https://www.postman.com/"><img src="https://www.svgrepo.com/show/354202/postman-icon.svg" width="20px"></a>: <a href="https://documenter.getpostman.com/view/27898805/2s9YkjA3Kv">CoffeeGit API Documentation</a></p>
<!-- <a href="https://documenter.getpostman.com/view/27898805/2s9YkjA3Kv"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRECLz-XFkGCMRcy8_t-lTHJ3VDkaOlFRqQQJkUjtZi161UGdKYZUML2dXmCVCZKlI3ZTQ&usqp=CAU" width="75%"></a> -->

<h3>Let's try our project</h3>
<h5>Description</h5>
<p>Main API for CoffeeGit app</p>
<p>Language used: Javascript.</p>
<p>Framework used: NodeJS</p>
<p>Database used: MySQL</p>
<p>Lastest update: v1.0</p>
<p>To run the API locally, you need to:</p>
<ol>
  <li>Clone repository https://github.com/BANGKIT-CH2-PS156/CC or download to your local.</li>
  <li>Open visual studio code and open the project</li>
  <li>Open the terminal in visual studio code after you open the project</li>
  <li>Run “npm install” to install all package</li>
  <li>Don’t forget to create the database, you can import with we provide in folder “db” to your local MYSQL Database (XAMPP or anything)</li>
  <li>Edit .env and adjust, fill like your setting. For the “Google Client ID ..etc” you must be seting google credential and create a bucket.</li>
  <li>So first, open the google cloud platform, create new project</li>
  <li>Open “APIs & Services”  “OAuth consent screen”, click “Configure Consenst Screen”</li>
  <li>User Type choose “External” and “CREATE”</li>
  <li>Fill App Information</li>
  <li>Add your “Authorized domain” fill with your domain, and “Save and continue”</li>
  <li>Click “ADD OR REMOVE SCOPES” choose “./auth/userinfo.email” and “./auth/userinfo.profile”, and “Save and continue”, fill your email for tester and “save and continue” again.</li>
  <li>After that go to “Credentials”, click “+ CREATE CREDENTIALS”  and choose “OAuth client ID”</li>
  <li>Choose “Application type”  “Web application”</li>
  <li>Fill “Authorized JavaScript origins” with your domain</li>
  <li>Fill “Authorized redirect URIs” add 2 URI with your domain then give “/auth/google” and with “https://developers.google.com/oauthplayground”</li>
  <li>After that you “SAVE” and you can get “CLIENT ID” and “CLIENT SECRET”</li>
  <li>Then you go to “https://developers.google.com/oauthplayground”</li>
  <li>Click Setting in right above, than ceklis "Use your own OAuth credentials”, and fill the OAuth Client ID and OAuth Client secret with yours</li>
  <li>Choose “Gmail API v1” in the left and click https://mail.google.com then click “Authorize APIs”</li>
  <li>Click “Exchange authorization code for tokens”, after that you can get “Refresh token” then copy to .env</li>
  <li>After that create a bucket, and copy the name of bucket to your .env and the name of your project GCP. </li>
  <li>Don’t forget to create a “service accounts”, click menu “IAM & Admin” then “Service Accounts”</li>
  <li>Click “+CREATE SERVIC ACCOUNT” fill the name what you want, then “CREATE AND CONTINUE”, and choose the Role “Cloud Storage”  “Storage Object Viewer”, then “Done”</li>
  <li>Click bottom actions, and choose “Manage keys”, click “ADD KEY”  “Create new key” and create with key type “JSON”</li>
  <li>You can automatic download the service account key, now copy all code in the file to file “serviceaccountkey.json” or replace the file with the same name in the project.</li>
  <li>Last fill the endpoint of predict API (ML API), then complete.</li>
  <li>Now you can run the project via terminal with “npm run start” or “npm run dev” (if your run with “... run dev” you must install nodemon first”.</li>
  <li>Note: you can ignore the all google service (cliend ID and other) if you can’t use GCP, but you can’t run correctly the endpoint of /register and other endpoint to upload photo because this code use GCP for save the image file and use email sending for confirmation email to register.</li>
  <li>Enjoy the code “Picking Hopes, Brewing Bonds, Pouring Knowledge”.</li>
</ol>
