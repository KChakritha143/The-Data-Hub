import assert from "assert";

const BASE_URL = "http://localhost:5000";

async function runTests() {
  console.log("🚀 Starting API integration tests...\n");

  try {
    // 1. Test GET /
    console.log("Testing GET / (Server info)...");
    const infoRes = await fetch(`${BASE_URL}/`);
    assert.strictEqual(infoRes.status, 200);

    const infoData = await infoRes.json();
    assert.ok(infoData.project);
    assert.strictEqual(infoData.project, "The Data Hub");

    console.log("✅ GET / passed.\n");

    // 2. Test GET /posts (empty database)
    console.log("Testing GET /posts (Initial empty array)...");
    const getInitialRes = await fetch(`${BASE_URL}/posts`);
    assert.strictEqual(getInitialRes.status, 200);

    const initialPosts = await getInitialRes.json();
    assert.ok(Array.isArray(initialPosts.data));
    assert.strictEqual(initialPosts.data.length, 0);

    console.log("✅ GET /posts (initial) passed.\n");

    // 3. Test POST /posts
    console.log("Testing POST /posts (Create post)...");

    const postPayload = {
      title: "Exploring Node.js & Express",
      content: "Building a RESTful API Server for the Data Hub sprint.",
    };

    const postRes = await fetch(`${BASE_URL}/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postPayload),
    });

    assert.strictEqual(postRes.status, 201);

    const postResult = await postRes.json();

    assert.ok(postResult.data.id);
    assert.strictEqual(postResult.data.title, postPayload.title);
    assert.strictEqual(postResult.data.content, postPayload.content);

    const postId = postResult.data.id;

    console.log(`✅ POST /posts passed. Created Post ID: ${postId}\n`);

    // 4. Test GET /posts
    console.log("Testing GET /posts (Verify post exists)...");

    const getAfterPostRes = await fetch(`${BASE_URL}/posts`);
    assert.strictEqual(getAfterPostRes.status, 200);

    const postsAfterPost = await getAfterPostRes.json();

    assert.strictEqual(postsAfterPost.data.length, 1);
    assert.strictEqual(postsAfterPost.data[0].id, postId);

    console.log("✅ GET /posts (after creation) passed.\n");

    // 5. Test GET /posts/:id
    console.log(`Testing GET /posts/${postId} (Retrieve single post)...`);

    const getSingleRes = await fetch(`${BASE_URL}/posts/${postId}`);
    assert.strictEqual(getSingleRes.status, 200);

    const singlePost = await getSingleRes.json();

    assert.strictEqual(singlePost.data.id, postId);
    assert.strictEqual(singlePost.data.title, postPayload.title);

    console.log("✅ GET /posts/:id passed.\n");

    // 6. Test PUT /posts/:id
    console.log(`Testing PUT /posts/${postId} (Update post)...`);

    const updatePayload = {
      title: "Exploring Node.js & Express (Updated)",
    };

    const putRes = await fetch(`${BASE_URL}/posts/${postId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatePayload),
    });

    assert.strictEqual(putRes.status, 200);

    const putResult = await putRes.json();

    assert.strictEqual(
      putResult.data.title,
      "Exploring Node.js & Express (Updated)"
    );

    assert.strictEqual(
      putResult.data.content,
      postPayload.content
    );

    console.log("✅ PUT /posts/:id passed.\n");

    // 7. Test DELETE /posts/:id
    console.log(`Testing DELETE /posts/${postId} (Delete post)...`);

    const deleteRes = await fetch(`${BASE_URL}/posts/${postId}`, {
      method: "DELETE",
    });

    assert.strictEqual(deleteRes.status, 200);

    console.log("✅ DELETE /posts/:id passed.\n");

    // 8. Verify deleted post returns 404
    console.log(
      `Testing GET /posts/${postId} (Verify 404 after delete)...`
    );

    const getNotFoundRes = await fetch(
      `${BASE_URL}/posts/${postId}`
    );

    assert.strictEqual(getNotFoundRes.status, 404);

    console.log("✅ GET /posts/:id (404 check) passed.\n");

    // 9. Verify database is empty
    console.log("Testing GET /posts (Verify database is empty)...");

    const getFinalRes = await fetch(`${BASE_URL}/posts`);
    const finalPosts = await getFinalRes.json();

    assert.strictEqual(finalPosts.data.length, 0);

    console.log("✅ GET /posts (final verification) passed.\n");

    console.log("🎉 All API integration tests passed successfully!");
  } catch (error) {
    console.error("❌ Integration test failed with error:");
    console.error(error);
    process.exit(1);
  }
}

runTests();