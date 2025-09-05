function changeText() {
    const headings = document.querySelectorAll('h1, p');
    headings.forEach(heading => {
        heading.style.color = 'red';
    });
    alert('文本颜色已改变！');
}