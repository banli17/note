class UserCard extends HTMLElement {
    constructor() {
        super();
        var shadow = this.attachShadow({
            mode: 'closed'
        })

        var templateElem = document.getElementById('userCardTemplate');
        var content = templateElem.content.cloneNode(true);

        content.querySelector('img').setAttribute('src', this.getAttribute('image'));
        content.querySelector('.container>.name').innerText = this.getAttribute('name');
        content.querySelector('.container>.email').innerText = this.getAttribute('email');
        shadow.appendChild(content);

        // 绑定事件
        this.$button = shadow.querySelector('button');
        this.$button.addEventListener('click', () => {
            alert('followed')
        });
    }
}

window.customElements.define('user-card', UserCard)