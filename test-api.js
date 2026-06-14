import assert from 'assert';

const BASE_URL = 'http://localhost:5000';

async function runTests() {
  console.log('🚀 Starting API integration tests...\n');

  try {
    // 1. Test GET / - Server status info
    console.log('Testing GET / (Server info)...');
    const infoRes = await fetch(`${BASE_URL}/`);
    assert.strictEqual(infoRes.status, 200, 'GET / should return status 200');
    const infoData = await infoRes.json();
    assert.ok(infoData.message, 'Response should contain message');
    console.log('✅ GET / passed.\n');
    // 2. Test GET /posts - Should be empty at start
    console.log('Testing GET /posts (Initial empty array)...');
    const getInitialRes = await fetch(`${BASE_URL}/posts`);
    assert.strictEqual(getInitialRes.status, 200, 'GET /posts should return status 200');
    const initialPosts = await getInitialRes.json();
    assert.ok(Array.isArray(initialPosts), 'GET /posts should return an array');
    assert.strictEqual(initialPosts.length, 0, 'Initial posts should be empty');
    console.log('✅ GET /posts (initial) passed.\n');
    // 3. Test POST /posts - Create a new post
    console.log('Testing POST /posts (Create post)...');
    const postPayload = {
      title: 'Exploring Node.js & Express',
      content: 'Building a RESTful API Server for the Data Hub sprint.'
    };
    const postRes = await fetch(`${BASE_URL}/posts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(postPayload)
    });
    assert.strictEqual(postRes.status, 201, 'POST /posts should return status 201');
    const postResult = await postRes.json();
    assert.ok(postResult.post.id, 'Created post should have a generated id');
    assert.strictEqual(postResult.post.title, postPayload.title, 'Created post title match');
    assert.strictEqual(postResult.post.content, postPayload.content, 'Created post content match');
    const postId = postResult.post.id;
    console.log(`✅ POST /posts passed. Created Post ID: ${postId}\n`);
    // 4. Test GET /posts - Should contain 1 post
    console.log('Testing GET /posts (Verify post exists)...');
    const getAfterPostRes = await fetch(`${BASE_URL}/posts`);
    const postsAfterPost = await getAfterPostRes.json();
    assert.strictEqual(postsAfterPost.length, 1, 'Posts array should contain 1 item');
    assert.strictEqual(postsAfterPost[0].id, postId, 'Returned post ID should match created ID');
    console.log('✅ GET /posts (after creation) passed.\n');
    // 5. Test GET /posts/:id - Retrieve the specific post
    console.log(`Testing GET /posts/${postId} (Retrieve single post)...`);
    const getSingleRes = await fetch(`${BASE_URL}/posts/${postId}`);
    assert.strictEqual(getSingleRes.status, 200, 'GET /posts/:id should return status 200');
    const singlePost = await getSingleRes.json();
    assert.strictEqual(singlePost.id, postId, 'Retrieved post ID matches');
    assert.strictEqual(singlePost.title, postPayload.title, 'Retrieved post title matches');
    console.log('✅ GET /posts/:id passed.\n');
    // 6. Test PUT /posts/:id - Update the post
    console.log(`Testing PUT /posts/${postId} (Update post title)...`);
    const updatePayload = {
      title: 'Exploring Node.js & Express (Updated)'
    };
    const putRes = await fetch(`${BASE_URL}/posts/${postId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatePayload)
    });
    assert.strictEqual(putRes.status, 200, 'PUT /posts/:id should return status 200');
    const putResult = await putRes.json();
    assert.strictEqual(putResult.post.title, updatePayload.title, 'Updated post title should match new title');
    assert.strictEqual(putResult.post.content, postPayload.content, 'Post content should remain unchanged');
    console.log('✅ PUT /posts/:id passed.\n');
    // 7. Test DELETE /posts/:id - Delete the post
    console.log(`Testing DELETE /posts/${postId} (Delete post)...`);
    const deleteRes = await fetch(`${BASE_URL}/posts/${postId}`, {
      method: 'DELETE'
    });
    assert.strictEqual(deleteRes.status, 200, 'DELETE /posts/:id should return status 200');
    console.log('✅ DELETE /posts/:id passed.\n');
    // 8. Test GET /posts/:id - Should return 404 Not Found now
    console.log(`Testing GET /posts/${postId} (Verify 404 after delete)...`);
    const getNotFoundRes = await fetch(`${BASE_URL}/posts/${postId}`);
    assert.strictEqual(getNotFoundRes.status, 404, 'GET /posts/:id should return 404 for deleted post');
    console.log('✅ GET /posts/:id (404 check) passed.\n');
    // 9. Test GET /posts - Should be empty again
    console.log('Testing GET /posts (Verify database is empty)...');
    const getFinalRes = await fetch(`${BASE_URL}/posts`);
    const finalPosts = await getFinalRes.json();
    assert.strictEqual(finalPosts.length, 0, 'Posts array should be empty');
    console.log('✅ GET /posts (final verification) passed.\n');
    console.log('All API integration tests passed successfully!');
  } catch (error) {
    console.error('❌ Integration test failed with error:');
    console.error(error);
    process.exit(1);
  }
}
runTests();