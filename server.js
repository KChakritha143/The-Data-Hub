import express from "express";
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON request bodies
app.use(express.json());

// Logger Middleware
app.use((req, res, next) => {
  console.log(
    `${new Date().toISOString()} | ${req.method} | ${req.url}`
  );
  next();
});

// In-Memory Database
let blogPosts = [];

// ROOT ROUTE
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    project: "The Data Hub",
    version: "1.0.0",
    totalPosts: blogPosts.length,
    status: "Running",
  });
});

// HEALTH CHECK
app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    status: "OK",
    timestamp: new Date().toISOString(),
  });
});

//  GET ALL POSTS
  app.get("/posts", (req, res) => {
  const sortedPosts = [...blogPosts].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );
  res.status(200).json({
    success: true,
    totalPosts: sortedPosts.length,
    data: sortedPosts,
  });
});

// GET SINGLE POST
app.get("/posts/:id", (req, res) => {
  const { id } = req.params;
  const post = blogPosts.find((p) => p.id === id);
  if (!post) {
    return res.status(404).json({
      success: false,
      error: `Post with ID ${id} not found`,
    });
  }
  res.status(200).json({
    success: true,
    data: post,
  });
});

// CREATE POST
app.post("/posts", (req, res) => {
  const { title, content, ...otherDetails } = req.body;
  if (
    typeof title !== "string" ||
    typeof content !== "string" ||
    !title.trim() ||
    !content.trim()
  ) {
    return res.status(400).json({
      success: false,
      error: "Title and content are required and must be non-empty strings",
    });
  }
  const newPost = {
    id: Date.now().toString(),
    title: title.trim(),
    content: content.trim(),
    ...otherDetails,
    createdAt: new Date().toISOString(),
  };
  blogPosts.push(newPost);
  res.status(201).json({
    success: true,
    message: "Post created successfully",
    data: newPost,
  });
});

//  UPDATE POST
app.put("/posts/:id", (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const postIndex = blogPosts.findIndex((p) => p.id === id);
  if (postIndex === -1) {
    return res.status(404).json({
      success: false,
      error: `Post with ID ${id} not found`,
    });
  }
  const updatedPost = {
    ...blogPosts[postIndex],
    ...(title !== undefined && { title: title.trim() }),
    ...(content !== undefined && { content: content.trim() }),
    updatedAt: new Date().toISOString(),
  };
  blogPosts[postIndex] = updatedPost;
  res.status(200).json({
    success: true,
    message: "Post updated successfully",
    data: updatedPost,
  });
});

// DELETE POST
app.delete("/posts/:id", (req, res) => {
  const { id } = req.params;
  const postExists = blogPosts.some((p) => p.id === id);
  if (!postExists) {
    return res.status(404).json({
      success: false,
      error: `Post with ID ${id} not found`,
    });
  }
  blogPosts = blogPosts.filter((p) => p.id !== id);
  res.status(200).json({
    success: true,
    message: `Post with ID ${id} deleted successfully`,
  });
});

// 404 ROUTE HANDLER
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: "Route not found",
  });
});

// GLOBAL ERROR HANDLER
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    success: false,
    error: "Internal Server Error",
  });
});

// START SERVER
app.listen(PORT, () => {
  console.log("====================================");
  console.log(`The Data Hub Server Running`);
  console.log(`URL: http://localhost:${PORT}`);
  console.log(`Port: ${PORT}`);
  console.log("====================================");
});