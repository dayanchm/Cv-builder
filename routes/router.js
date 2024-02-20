const express = require("express");
const router = express.Router();
const {loginAuthMiddleware, authMiddleware} = require("../middleware/userMiddleware.js")
const {SitemapController} =require ('../controller/sitemapController.js');
const {Blogs} = require ("../controller/blogController.js")
const authenticateUser  = require("../middleware/authenticate.js"); // Middleware dosyasının yolunu doğru şekilde belirtmelisiniz

const {
    SiteController,
    AdminController,
    AuthController,
    ResumeController,
    FaqController,
    CookieController,
    AboutController,
    CirriculumController
} =require ("../controller/adminController.js")
const {SitesController} = require("../controller/siteController.js")
const {CommentsController} = require("../controller/commentController.js")
const {SeoController} = require("../controller/seoController.js")
const { body, validationResult } = require('express-validator');
const ContactController = require("../controller/contactController.js")
const langController = require('../controller/langController.js');
const {UserController} = require("../controller/UserController.js")

router.use(authenticateUser);


// Site
router.get('/', SiteController.getIndexpage);
router.get('/', SiteController.getIndexFooter);
router.get('/resume-cv', SiteController.getResume)
router.get('/blog',     SiteController.getBlog)
router.get('/blog/:slug',SiteController.getSlugBlog)
router.get("/sitemap.xml", SitemapController.generateSitemap)
router.get("/contact", SiteController.getContact)
router.get("/cookie", SiteController.getCookie)
router.get("/about", SiteController.getAbout)
router.get("/price", SiteController.getPrice)
router.get("/contact-form", SiteController.getContactForm)
router.get('/login', SiteController.getLogin)
router.get('/resume_service', SiteController.getResumService)
router.get('/success', SiteController.getContactForm)
router.get('/sss', SiteController.getSSS)


// User
router.get('/register', UserController.GetRegister)
router.post('/register', UserController.RegisterUser);
router.post('/login', UserController.LoginUser);
router.get('/logout', UserController.LogoutUser)



// Contact Post
router.post('/contacts', [
    body('name').notEmpty().withMessage('First Name is required'),
    body('surname').notEmpty().withMessage('Last Name is required'),
    body('email').isEmail().withMessage('Invalid email address'),
    body('message').notEmpty().withMessage('Message is required')
], ContactController.sendEmail);


// Blog
router.get("/panel", authMiddleware,AdminController.getPanel)
router.get("/panel/blogs", authMiddleware, AdminController.getBlog)
router.get("/panel/blog/add", authMiddleware, AdminController.getAdminBlogEkle);


//Blog
router.post('/panel/blog', authMiddleware, Blogs.Blogpost);
router.get('/panel/blog', authMiddleware, Blogs.Blogget);
router.delete('/panel/blog/:id', authMiddleware, Blogs.BlogDelete);
router.get("/panel/blog/edit/:id", authMiddleware, Blogs.BlogEditPage);
router.put('/panel/blog/:id', authMiddleware, Blogs.BlogUpdate);

// Resume 
router.get('/panel/resume', authMiddleware, ResumeController.getResume)
router.get('/panel/resume/add', authMiddleware, ResumeController.getResumeAdd)
router.post('/panel/resumes', authMiddleware, ResumeController.addResume)
router.delete('/panel/resume/:id', authMiddleware, ResumeController.deleteResume)
router.get("/panel/resume/edit/:id", authMiddleware, ResumeController.editResume);
router.put('/panel/resume/:id', authMiddleware, ResumeController.updateResume);

//Login
router.get("/panel/login",loginAuthMiddleware, AuthController.getLogin)
router.post('/admin/register', AuthController.RegisterUser);
router.post('/panel/logout', authMiddleware, AuthController.LogoutUser)
router.post('/admin/login', loginAuthMiddleware, AuthController.LoginUser)


// Faq 
router.post('/panel/faqs', authMiddleware, FaqController.addFaqiest)
router.delete('/panel/faq/:id', authMiddleware, FaqController.deleteFaq)
router.get("/panel/faq", authMiddleware, FaqController.getFaqiest)
router.get("/panel/faq/add", authMiddleware, FaqController.getFaqeiestAdd)
router.get("/panel/faq/edit/:id", authMiddleware, FaqController.editFaq);
router.put('/panel/faq/:id', authMiddleware, FaqController.updateFaq);


// Cookie 
router.get('/panel/cookie', authMiddleware, CookieController.getCookies)
router.get("/panel/cookie/add", authMiddleware, CookieController.addCook)
router.post('/panel/cookies', authMiddleware, CookieController.addCookiest)
router.delete('/panel/cookies/:id', authMiddleware, CookieController.deleteCookies)
router.get("/panel/cookie/edit/:id", authMiddleware, CookieController.editCookies);
router.put('/panel/cookie/:id', authMiddleware, CookieController.updateCookies);

// About
router.get('/panel/about', authMiddleware, AboutController.getAbout)
router.get('/panel/about/add', authMiddleware, AboutController.getAboutAdd)
router.post('/panel/abouties', authMiddleware, AboutController.addAbout)
router.delete('/panel/about/:id', authMiddleware, AboutController.deleteAbout)
router.get("/panel/about/edit/:id", authMiddleware, AboutController.editAbout);
router.put('/panel/about/:id', authMiddleware, AboutController.updateAbout);


// Site Kontrol
router.get("/panel/site", authMiddleware, SitesController.Siteget)
router.get("/panel/site/add", authMiddleware, SitesController.SiteAdd)
router.post('/panel/sites', authMiddleware, SitesController.Sitepost)
router.delete('/panel/site/:id', authMiddleware, SitesController.SiteDelete)
router.get("/panel/site/edit/:id", authMiddleware, SitesController.EditSite);
router.put('/panel/site/:id', authMiddleware, SitesController.UpdateSite);

// Comments 
router.get("/panel/comment", authMiddleware, CommentsController.getComments)
router.get("/panel/comment/add",authMiddleware, CommentsController.addComments)
router.post("/panel/comments", authMiddleware, CommentsController.postComments)
router.delete('/panel/comments/:id', authMiddleware, CommentsController.deleteComments)
router.get("/panel/comments/edit/:id", authMiddleware, CommentsController.EditComments);
router.put('/panel/comments/:id', authMiddleware, CommentsController.updateComments);

// Cirrulum
router.get("/panel/curriculum", authMiddleware, CirriculumController.getCirrulum)
router.get("/panel/curriculum/add", authMiddleware, CirriculumController.getCirrulumAdd)
router.post("/panel/curriculums", authMiddleware, CirriculumController.addCirrulumiest)
router.delete("/panel/curriculums/:id", authMiddleware, CirriculumController.deleteCirrulum)
router.get("/panel/curriculum/edit/:id", authMiddleware, CirriculumController.editCirrulum);
router.put('/panel/curriculum/:id', authMiddleware, CirriculumController.updateCirrulum);


// Seo
router.get("/panel/seo", authMiddleware, SeoController.getSeo)
router.post("/panel/seos", authMiddleware, SeoController.postSeo)
router.get("/panel/seo/add", authMiddleware, SeoController.getSeoAdd)
router.delete("/panel/seo/:id", authMiddleware, SeoController.deleteSeo)
router.get("/panel/seo/edit/:id", authMiddleware, SeoController.editSeo);
router.put('/panel/seo/:id', authMiddleware, SeoController.updateSeo);

module.exports = router;
