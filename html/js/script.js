// 配置选项
const config = {
    fontSizes: ['small', 'medium', 'large', 'xlarge'],
    fontColors: ['black', 'blue', 'green', 'red', 'purple'],
    languages: ['simplified', 'traditional', 'english']
};

// 多语言内容
const contentDictionary = {
    'simplified': {
        'title': '你好，世界！',
        'content': '这是我的第一个用Deveco Studio创建的网页。欢迎来到这个演示页面，这里展示了字体大小、颜色和语言切换功能。'
    },
    'traditional': {
        'title': '你好，世界！',
        'content': '這是我的第一個用Deveco Studio創建的網頁。歡迎來到這個演示頁面，這裡展示了字體大小、顏色和語言切換功能。'
    },
    'english': {
        'title': 'Hello, World!',
        'content': 'This is my first webpage created with Deveco Studio. Welcome to this demo page showcasing font size, color, and language switching features.'
    }
};

// 当前状态
let currentState = {
    fontSizeIndex: 1, // medium
    colorIndex: 0,    // black
    languageIndex: 0  // simplified
};

// 初始化
function initialize() {
    loadSettings();
    updateDisplay();
}

// 加载保存的设置
function loadSettings() {
    const saved = localStorage.getItem('readerSettings');
    if (saved) {
        currentState = JSON.parse(saved);
    }
}

// 保存设置
function saveSettings() {
    localStorage.setItem('readerSettings', JSON.stringify(currentState));
}

// 切换字体大小
function toggleFontSize() {
    currentState.fontSizeIndex = (currentState.fontSizeIndex + 1) % config.fontSizes.length;
    updateDisplay();
    saveSettings();
    showTempMessage(`字体大小: ${getSizeName(config.fontSizes[currentState.fontSizeIndex])}`);
}

// 切换字体颜色
function toggleFontColor() {
    currentState.colorIndex = (currentState.colorIndex + 1) % config.fontColors.length;
    updateDisplay();
    saveSettings();
    showTempMessage(`字体颜色: ${config.fontColors[currentState.colorIndex]}`);
}

// 切换语言
function toggleLanguage() {
    currentState.languageIndex = (currentState.languageIndex + 1) % config.languages.length;
    updateDisplay();
    saveSettings();
    showTempMessage(`语言: ${getLanguageName(config.languages[currentState.languageIndex])}`);
}

// 更新显示
function updateDisplay() {
    const content = document.getElementById('mainContent');
    const language = config.languages[currentState.languageIndex];
    const text = contentDictionary[language];

    // 更新内容
    content.innerHTML = `
        <h1>${text.title}</h1>
        <p>${text.content}</p>
    `;

    // 应用字体大小
    content.className = 'content';
    content.classList.add(`font-${config.fontSizes[currentState.fontSizeIndex]}`);

    // 应用字体颜色
    content.style.color = config.fontColors[currentState.colorIndex];
}

// 显示临时消息
function showTempMessage(message) {
    // 移除旧的消息
    const oldMsg = document.querySelector('.temp-message');
    if (oldMsg) oldMsg.remove();

    // 创建新消息
    const msg = document.createElement('div');
    msg.className = 'temp-message';
    msg.textContent = message;
    document.body.appendChild(msg);

    // 2秒后消失
    setTimeout(() => msg.remove(), 2000);
}

// 获取字体大小名称
function getSizeName(size) {
    const names = {
        'small': '小',
        'medium': '中',
        'large': '大',
        'xlarge': '超大'
    };
    return names[size] || size;
}

// 获取语言名称
function getLanguageName(lang) {
    const names = {
        'simplified': '简体',
        'traditional': '繁體',
        'english': 'English'
    };
    return names[lang] || lang;
}

// 页面加载时初始化
document.addEventListener('DOMContentLoaded', initialize);