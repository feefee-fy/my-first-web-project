

let unityInstance = null;
let isVRLoaded = false;

function loadUnityVR() {
    console.log('开始加载Unity VR...');

    const loadingOverlay = document.getElementById('loadingOverlay');
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');

    try {
        unityInstance = UnityLoader.instantiate(
            "unity-container",
            "/unity-vr/Build/WebGL-Build.json",
            {
                onProgress: function(unityInstance, progress) {
                    const percent = Math.round(progress * 100);
                    progressFill.style.width = percent + '%';
                    progressText.textContent = percent + '%';
                },
                Module: {
                    onRuntimeInitialized: function() {
                        loadingOverlay.style.display = 'none';
                        isVRLoaded = true;
                    },
                    onError: function(error) {
                        progressText.textContent = '加载失败: ' + error;
                    }
                }
            }
        );

    } catch (error) {
        console.error('初始化异常:', error);
    }
}

