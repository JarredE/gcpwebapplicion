module.exports = ({ refID,referrer_fname,
  referrer_lname,
  status,
  outfit_combo,
  bottom_color,
  top_colors,
  pant_size,
  top_size,
  bra_info,
  underwear,
  shoe_size,
  socks,
  hygiene_kit,
  hygiene_items,
  feminine_hygiene,
  school_supplies,
  student_initials,
  student_agency,
  referrer_email,
  referrer_phone,
  relation,
  updatedAt, 
pdflogo }) => {
    const today = new Date();

    return `
    <!doctype html>
    <html>
       <head>
          <meta charset="utf-8">
          <style>
   @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;600;700;800;900&display=swap');
   
   	.clearfix:after {
  content: "";
  display: table;
  clear: both;
}

a {
  color: #5D6975;
  text-decoration: underline;
}
@fontface{
  font-style:normal;
  font-family: Montserrat;
  font-display: swap;
  src: url('https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;600;700;800;900&display=swap');
}
body {
  position: relative;
  width: 21cm;   
  margin: 0 auto; 
  color: #3b3b3b;
  background: #FFFFFF;
  font-size: 12px;
  
}

header {
  padding: 10px 0;
  margin-bottom: 10px;
}

#logo {
  text-align: right;
  padding: 20px;
}

#logo img {
  width: 196px;
}

h1 {
  color: #C1CED9;
  font-size: 2.4em;
  font-weight: 800;
}

#project{
text-align: left;
background-color: #f9f9f9;
padding: 20px;
}

#project span {
	float: left;
  color: #5D6975;
  text-align: left;
  width: 52px;
  margin-right: 10px;
  display: inline-block;
  font-size: 0.8em;
  font-weight: 800;
}
.refinfo{
	align-content: center;
	
	
}

#company {
  float: left;
  text-align: left;
}

#project div,
#company div {
  white-space: nowrap; 
  line-height: 14pt;  
}

table {
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
  margin-bottom: 20px;
}



table th,
table td {
  text-align: center;
   font-size: 0.8em;
}

table th {
  padding: 5px 20px 20px 10px;
  color: #3b3b3b;
  border-bottom: 1px solid #3b3b3b;
  white-space: nowrap;        
  font-weight: 600;
}

table .num,
table .item {
  text-align: left;
  font-size: 0.9em;

}
table td {
  padding: 10px;
  text-align: right;
}

table td.num,
table td.item {
  vertical-align: top;
}

table td.note,
table td.size,
table td.total {
  font-size: 0.9em;
}

table td.grand {
  border-top: 1px solid #5D6975;;
}

.notice {
  color: #5D6975;
  font-size: 1em;
  text-align: center;
  line-height: 14pt;
}

.footer {
  color: #5D6975;
  width: 100%;
  height: 30px;
  bottom: 0;
  padding: 8px 0;
  text-align: center;
}
.headtable{
	border-collapse: collapse;
	border-top: 1px solid #C1CED9;
	border-left: 1px solid #C1CED9;
	border-right: 1px solid #C1CED9;
}
.foottable{
	border-collapse: collapse;
	border-bottom: 1px solid #C1CED9;
	border-left: 1px solid #C1CED9;
	border-right: 1px solid #C1CED9;
}
.referralNum{
	font-weight: 800;
	padding-bottom: 15px;
	border-bottom: 1px solid #C1CED9;
	text-align: left;
}
.alignLeft{
	text-align: left;
	padding: 25px 0px 0px 50px;
}
.alignTop{
	text-align: left;
	vertical-align: top;
}
.itemList{
	background-color: #e9fef2;
	padding: 40px;
}
.headwrap{
	margin: 25px 25px 0px 25px;
}
.footwrap{
	margin: 0px 25px 25px 25px;
}
   </style>
       </head>
       <body>
       <div class="headwrap">
    <table class="headtable">
    	<tr>
    		<td class="alignLeft"><span class="referralNum">RECEIPT FOR REFERRAL #${refID}</span></td>
    		<td rowspan="4"><div id="logo">
        <img src="data:image/png;base64,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">
      </div></td>
    	</tr>
    	
    	<tr>
    		<td class="alignLeft"><h1>${status}</h1>${updatedAt}</td>
    	</tr>
    	
    </table>
    </div>
    <div class="itemList">
      <table>
        <thead>
          <tr>
            <th class="num">#</th>
            <th class="item">ITEM</th>
            <th>NOTES/DETAILS</th>
            <th>SIZES</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="num">1</td>
            <td class="item">${outfit_combo}</td>
            <td class="note">Uniform Bottom(s): ${bottom_color}<br />
            				 Uniform Top(s): ${top_colors}</td>
            <td class="size">${pant_size}<br />
            				${top_size}</td>
          </tr>
          <tr>
            <td class="num">2</td>
            <td class="item">Bra</td>
            <td class="note">${bra_info}</td>
            <td class="size"></td>
          </tr>
          <tr>
            <td class="num">3</td>
            <td class="item">Underwear</td>
            <td class="note">${underwear}</td>
            <td class="size"></td>
          </tr>
          <tr>
            <td class="num">4</td>
            <td class="item">Shoes</td>
            <td class="note"></td>
            <td class="size">${shoe_size}</td>
          </tr>
          <tr>
            <td class="num">5</td>
            <td class="item">Socks</td>
            <td class="note">${socks}</td>
            <td class="size"></td>
          </tr>
          <tr>
            <td class="num">6</td>
            <td class="item">Hygiene Kit(s)</td>
            <td class="note">${hygiene_kit}</td>
            <td class="size"></td>
          </tr>
          <tr>
            <td class="num">7</td>
            <td class="item">Hygiene Items</td>
            <td class="note">${hygiene_items}</td>
            <td class="size"></td>
          </tr>
          <tr>
            <td class="num">8</td>
            <td class="item">Feminine Hygiene</td>
            <td class="note">${feminine_hygiene}</td>
            <td class="size"></td>
          </tr>
          <tr>
            <td class="num">9</td>
            <td class="item">School Supplies</td>
            <td class="note">${school_supplies}</td>
            <td class="size"></td>
          </tr>
        </tbody>
      </table>
      </div>
    <div class="footwrap">
    <table class="foottable">
    <tr>
    	<td colspan="2"><div class="notice">
        </td>
    </tr>
    	<tr>
    		<td class="refinfo"><div id="project">
        <div><span>STUDENT</span> ${student_initials}, ${student_agency}</div>
        <div><span>REFERRER</span> ${referrer_fname} ${referrer_lname}</div>
        <div><span>RELATION</span> ${relation}</div>
        <div><span>EMAIL</span> ${referrer_email}</div>
        <div><span>PHONE</span> ${referrer_phone}</div>
      </div></td>
      
      <td><div id="company" class="clearfix">
      <div>Mailing Address:</div>
        <div>The Giving Closet Project</div>
        <div>13475 Atlantic Blvd. Unit 8<br /> Jacksonville, FL. 32225<br /></div>
        <div>info@givingclosetproject.com</div>
      </div></td>
    	</tr>
    	
    </table>
    </div>
    <div class="footer">
      NOTE: Provided for your records. This is not an invoice.
    </div>
    </body>
    </html>
    `;
};