class Snackbar {
    constructor(message, title, type, icon, canClose, duration) {
        this.message = message;
        this.title = title;
        this.type = type;
        this.icon = icon;
        this.canClose = canClose;
        this.duration = duration;
    }


    render(targetElement) {
        console.log('render snackbar');
        const snackbarElement = document.createElement('div');
        snackbarElement.classList.add('snackbar', this.type);

        const message = document.createElement('p');
        message.classList.add('snackbar-message');
        message.textContent = this.message;
        snackbarElement.appendChild(message);



        if(this.title) {
            const title = document.createElement('p');
            title.classList.add('snackbar-title');
            title.textContent = this.title;
            snackbarElement.appendChild(title);
        }

        if(this.icon) {
            const icon = document.createElement('span');
            icon.classList.add('snackbar-icon', 'material-symbols-outlined', 'icon');
            icon.textContent = this.icon;
            snackbarElement.appendChild(icon);
        }

        if(this.canClose) {
            console.log('can close');

            const close = document.createElement('span');
            close.classList.add('snackbar-close', 'material-symbols-outlined', 'close');
            close.textContent = 'close';
            snackbarElement.appendChild(close);

            close.addEventListener('click', () => {
                snackbarElement.classList.remove('show');
                setTimeout(() => {
                    targetElement.removeChild(snackbarElement);
                }, 1000);
            });
        }


        targetElement.appendChild(snackbarElement);


        setTimeout(() => {
            snackbarElement.classList.add('show');
        }, 10);

        // setTimeout(() => {
        //     setTimeout(() => {
        //         targetElement.removeChild(snackbarElement);
                
        //     }, this.duration);
        //     snackbarElement.classList.remove('show');
        // }, (this.duration-1000));
    }
}

export class SnackbarBuilder {
    constructor(message) {
        this.message = message;
    }

    setTitle(title) {
        this.title = title;
        return this;
    }

    setType(type) {
        this.type = type;
        return this;
    }

    setIcon(icon) {
        this.icon = icon;
        return this;
    }

    setCanClose(canClose) {
        this.canClose = canClose;
        return this;
    }

    setDuration(duration) {
        this.duration = duration;
        return this;
    }

    buildSuccess() {
        this.setType('success');
        this.setDuration(5000);
        this.setCanClose(true);
        this.setIcon('check_circle');
        return this.build();
    }

    buildError() {
        this.setType('error');
        this.setDuration(5000);
        this.setCanClose(true);
        this.setIcon('error');
        return this.build();
    }

    buildWarning() {
        this.setType('warning');
        this.setDuration(5000);
        this.setCanClose(true);
        this.setIcon('warning');
        return this.build();
    }

    buildInfo() {
        this.setType('info');
        this.setDuration(5000);
        this.setCanClose(true);
        this.setIcon('info');
        return this.build();
    }

    build() {
        return new Snackbar(
            this.message,
            this.title,
            this.type,
            this.icon,
            this.canClose,
            this.duration
        );
    }
}