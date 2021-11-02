const Post= require('../models/Post');
const User = require('../models/User');

exports.getIndexPage = async (req, res) => {
  
  const page_name = "index";

  const userID = req.session.userID;
  
  const posts= await Post.find();
  
  console.log(userID);
    
  res.render('index', {
    posts,
    page_name        
  });
};

exports.getAdminPage = async (req, res) => {

  const page_name = "admin";

  const userID = req.session.userID;  

  const user = await User.findById({_id: userID}).populate(
    'posts'
  );

  console.log(user.role);

  const posts= await Post.find({owner: userID });
      
  res.render('admin', {        
    posts,
    user,
    page_name
  });
};

exports.getMemberPage = async (req, res) => {

  const page_name = "member";

  const userID = req.session.userID;  

  const user = await User.findById({_id: userID}).populate(
    'posts'
  );

  const posts= await Post.find({owner: userID });
      
  res.render('member', {        
    posts,
    user,
    page_name
  });
};

exports.sendEmail = async (req, res) => {
  try {
    const outputMessage = `
  
  <h1>Message Details</h1>
  <ul>
  <li>Name: ${req.body.name}</li>
  <li>Email: ${req.body.email}</li>
  </ul>
  <h1>Message</h1> 
  <p>${req.body.message}</p>
  `;
    let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: 'johndoe@gmail.com', // gmail account
        pass: 'passxxxxxxxx', // gmail password
      },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: `"Smart EDU Contact Form 👻" <${req.body.email}>`, // sender address
      to: 'johndoe@gmail.com', // list of receivers
      subject: 'Smart EDU Contact Form New Message ✔', // Subject line
      text: 'Hello world?', // plain text body
      html: outputMessage, // html body
    });

    console.log('Message sent: %s', info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

    req.flash('success', 'We received your message succesfully');
    res.status(200).redirect('contact');
  } catch (err) {
    req.flash('error', 'Something went wrong');
    res.status(200).redirect('contact');
  }
};