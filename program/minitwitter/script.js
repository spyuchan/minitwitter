// ローカルストレージから投稿を読み込む
function loadPosts() {
    const posts = JSON.parse(localStorage.getItem('minitwitter_posts') || '[]');
    return posts;
}

// ローカルストレージに投稿を保存する
function savePosts(posts) {
    localStorage.setItem('minitwitter_posts', JSON.stringify(posts));
}

// タイムラインを表示する
function displayTimeline() {
    const timeline = document.getElementById('timeline');
    const posts = loadPosts();
    
    if (posts.length === 0) {
        timeline.innerHTML = '<div class="empty-timeline">まだ投稿がありません。最初の投稿をしてみましょう！</div>';
        return;
    }
    
    // 新しい順に並び替え
    const sortedPosts = [...posts].sort((a, b) => b.timestamp - a.timestamp);
    
    timeline.innerHTML = sortedPosts.map(post => {
        const date = new Date(post.timestamp);
        const timeStr = date.toLocaleString('ja-JP', {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
        
        return `
            <div class="post">
                <div class="post-header">
                    <span class="post-name">${escapeHtml(post.name || '匿名')}</span>
                    <span class="post-time">${timeStr}</span>
                </div>
                <div class="post-content">${escapeHtml(post.content)}</div>
            </div>
        `;
    }).join('');
}

// HTMLエスケープ関数
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// 文字数カウントを更新
function updateCharCount() {
    const contentInput = document.getElementById('content-input');
    const charCount = document.getElementById('char-count');
    const count = contentInput.value.length;
    charCount.textContent = count;
    
    if (count >= 140) {
        charCount.style.color = '#e41e3f';
    } else {
        charCount.style.color = '#65676b';
    }
}

// 投稿処理
function postTweet() {
    const nameInput = document.getElementById('name-input');
    const contentInput = document.getElementById('content-input');
    const postBtn = document.getElementById('post-btn');
    
    const name = nameInput.value.trim();
    const content = contentInput.value.trim();
    
    // バリデーション
    if (!content) {
        alert('投稿内容を入力してください。');
        return;
    }
    
    if (content.length > 140) {
        alert('投稿は140字以内で入力してください。');
        return;
    }
    
    // 投稿ボタンを無効化（連続投稿防止）
    postBtn.disabled = true;
    
    // 投稿データを作成
    const post = {
        name: name || '匿名',
        content: content,
        timestamp: Date.now()
    };
    
    // 投稿を追加
    const posts = loadPosts();
    posts.push(post);
    savePosts(posts);
    
    // 入力欄をクリア
    nameInput.value = '';
    contentInput.value = '';
    updateCharCount();
    
    // タイムラインを更新（画面遷移なしで即座に反映）
    displayTimeline();
    
    // 投稿ボタンを再有効化
    postBtn.disabled = false;
    
    // 入力欄にフォーカスを戻す
    contentInput.focus();
}

// 初期化
document.addEventListener('DOMContentLoaded', function() {
    // タイムラインを表示
    displayTimeline();
    
    // 文字数カウントの更新
    const contentInput = document.getElementById('content-input');
    contentInput.addEventListener('input', updateCharCount);
    updateCharCount();
    
    // 投稿ボタンのイベント
    const postBtn = document.getElementById('post-btn');
    postBtn.addEventListener('click', postTweet);
    
    // Enterキー（Ctrl+Enter）で投稿
    contentInput.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.key === 'Enter') {
            postTweet();
        }
    });
});

