const Category = require("../model/categories");
const Post = require("../model/post");
const { post } = require("../routers/blog-routes");

const homePage = async (req, res) => {
  try {
    const categories = await Category.find();
    res.render("index", { title: "home-page", categories });
  } catch (err) {
    console.log(err);
  }
};


const categoriesContent = async(req, res) => {
    try{
          const category_Name = req.params.categoryName;
          const posts = await Post.find({category:category_Name});  
          // FIND CATEGORIES
          const categories = await Category.find({name:category_Name});
          res.render('categories-content', { title: 'categories-content', posts, categories });
    }

    catch(err){
         console.log(err)
    }
    
  };

  // for post details
const postDetails = async(req,res)=>{
    try{
        const id = req.params.id;
        const postName = req.params.postName;
        const postDetails = await Post.findById(id);
        const post_Names = await Post.find({category: postName}); 
        res.render('categories-content',{ title: 'Post content', postDetails, post_Names})
    }
    catch(err){
     console.log(err)
    }
  }

  const searchPost = async (req,res)=>{
    try{
      let searchPost = req.body.searchPost;
      let searchResults = await Post.find({$text:{
       $search:searchPost,
       $diacriticSensitive:true
      }});
      // res.json(searchResults);
      res.render('search',{title:'Search-results',searchResults});
    }
    catch(err){
      console.log(err)
    }
  }
  // create post
  const create_get = async (req,res)=>{
try{
res.render('create',{title:'create-post'})
}
catch(err){
console.log(err) 
}
  }

  const add_category = async (req,res)=>{
    try{
    res.render('category-add',{title:'new-category'})
    }
    catch(err){
    console.log(err) 
    }
      }

  const create_post = async(req, res)=>{
    try{

      // create new post
         const newPost = new Post({
            'name': req.body.name,
            'body': req.body.body,
            'category': req.body.category
         });
         await newPost.save();
         res.redirect('/');
    }

    catch(err){
      console.log(err);
    }
  }
  //edit post
  const edit_post= async (req,res)=>{
        try{
            const id = req.params.id;
            const editPost = await Post.findById(id);
            res.render('edit_post', {title: 'edit_post', editPost})
        }
        catch(err){
            console.log(err)
        }
  }

  const editPost_put = async (req,res)=>{
    try{
        const id = req.params.id;
        const toBEditedPost = await Post.findByIdAndUpdate(id);

        toBEditedPost.name = req.body.name;
        toBEditedPost.body = req.body.body ;
        toBEditedPost.category = req.body.category;
        await toBEditedPost.save();
        res.redirect(`/post/${toBEditedPost._id}/${toBEditedPost.category}`)
    }
    catch(err){
      console.log(err)
    }
  }

  //delete post
  const deletePost = async (req,res)=>{
    try{
         const id = req.params.id;
         await Post.findByIdAndDelete(id);
         res.redirect('/')
    }
    catch(err){
      console.log(err)
    }
  }
  //new category
  const newCategory = async (req,res)=>{

      let theImage;
      let imageName;
      let uploadPath;
          
      if(!req.files || Object.keys(req.files).length === 0){
        console.log('no file to upload')
      } else{
          theImage = req.files.image ; // replace body with files - grabbing the image file from the form
           imageName = theImage.name;
          uploadPath = require('path').resolve('./') + '/public/images' + imageName;
          
         theImage.mv(uploadPath, function(err){
          if(err){
           console.log(err);
          }
      })

      }
     
    try{
         const newCategory = new Category({
          'name':req.body.name,
          'body':req.body.body,
          'image': imageName,
         })
         await newCategory.save()
         res.redirect('/')
    }
    catch(err){
    console.log(err)
    }
  }

const aboutPage = (req, res) => {
  res.render("about", { title: "About us-page" });
};


// Edit Category

const editCategory_get = async(req,res)=>{
   try{
    const id = req.params.id
    const toBeEditedCategory = await Category.findById(id);
    // console.log(id);
    res.render('editCategory', {title: 'edit_category', toBeEditedCategory});
   }

   catch(err){
    console.log(err)
   }
}


const editCategory_put = async(req,res)=>{
     
  let theImage;
  let imageName;
  let uploadPath;
      
  if(!req.files || Object.keys(req.files).length === 0){
    console.log('no file to upload')
  } else{
      theImage = req.files.image ; // replace body with files - grabbing the image file from the form
       imageName = theImage.name;
      uploadPath = require('path').resolve('./') + '/public/images' + imageName;
      
     theImage.mv(uploadPath, function(err){
      if(err){
       console.log(err);
      }
  })

  }
 
try{
   
   const id = req.params.id
   const editedCategory = await Category.findByIdAndUpdate(id);
   editedCategory.name = req.body.name;
   editedCategory.body = req.body.body;
   editedCategory.image = imageName

   await editedCategory.save();
  //  res.json(editedCategory)
   res.redirect(`/category/${editedCategory.name}`);
   
}
catch(err){
console.log(err)
}
}


module.exports = {
  homePage,
  aboutPage,
  categoriesContent,
  postDetails,
  searchPost,
  create_get,
  add_category,
  create_post,
  edit_post,
  editPost_put,
  deletePost,
  newCategory,
  editCategory_get,
  editCategory_put
};
