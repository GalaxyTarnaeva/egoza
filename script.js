const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.slide');

const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

const controls = document.querySelector('.controls');
const menuBtn = document.querySelector('.menu');
const patternToggle = document.querySelector('.pattern-toggle');
const mockupToggle = document.querySelector('.mockup-toggle');
const mockupModal = document.querySelector('.mockup-modal');
const mockupModalImage = document.querySelector('.mockup-modal__dialog img');
const mockupSlides = {
    19: {
        src: 'images/мокап/бланк.png',
        alt: 'Мокап фирменного бланка'
    },
    20: {
        src: 'images/мокап/папка.png',
        alt: 'Мокап папки для бумаги'
    },
    21: {
        src: 'images/мокап/визитка.png',
        alt: 'Мокап визитки'
    },
    22: {
        src: 'images/мокап/конверт.png',
        alt: 'Мокап конверта'
    },
    23: {
        src: 'images/мокап/евробуклет1.png',
        alt: 'Мокап евробуклета'
    },
    24: {
        src: 'images/мокап/флаер.png',
        alt: 'Мокап флаера'
    },
    25: {
        src: 'images/мокап/бейдж.png',
        alt: 'Мокап бейджа'
    },
    26: {
        src: 'images/мокап/шары.png',
        alt: 'Мокап шариков'
    },
    27: {
        src: 'images/мокап/именные_наклейки.png',
        alt: 'Мокап именных наклеек'
    },
    28: {
        src: 'images/мокап/футболка1.png',
        alt: 'Мокап футболки'
    },
    30: {
        src: 'images/мокап/баннер1.png',
        alt: 'Мокап баннера'
    },
    31: {
        src: 'images/мокап/плакат1.png',
        alt: 'Мокап плаката'
    },
    32: {
        src: 'images/мокап/флагштоки.png',
        alt: 'Мокап флагштоков'
    },
    33: {
        src: 'images/мокап/ручка.png',
        alt: 'Мокап ручки'
    },
    34: {
        src: 'images/мокап/приглашения.png',
        alt: 'приглашения.png'
    },
    35: {
        src: 'images/мокап/пакеты.png',
        alt: 'Подарочные пакеты'
    },
    36: {
        src: 'images/мокап/коробка1.png',
        alt: 'Мокап коробки'
    },
    37: {
        src: 'images/мокап/шоппер.png',
        alt: 'Мокап шоппера'
    },
    38: {
        src: 'images/мокап/диск.png',
        alt: 'Мокап мини-диско CD диска'
    },
    39: {
        src: 'images/мокап/наклейки.png',
        alt: 'Мокап наклеек'
    },
    40: {
        src: 'images/мокап/сообщество_вк.png',
        alt: 'Мокап сообщества Вконтакте'
    },
    41: {
        src: 'images/мокап/посты1.png',
        alt: 'Мокап постов'
    },
    
};

const totalSlides = slides.length;

let currentIndex = 0;


// menu

const menuPanel = document.querySelector('.menu-panel');
const menuList = document.querySelector('.menu-list');


function placeControlsInViewport() {
    if (!controls) {
        return;
    }

    const viewport = window.visualViewport;
    const viewportWidth = viewport ? viewport.width : window.innerWidth;
    const viewportHeight = viewport ? viewport.height : window.innerHeight;
    const viewportLeft = viewport ? viewport.offsetLeft : 0;
    const viewportTop = viewport ? viewport.offsetTop : 0;
    const isCompactViewport = viewportWidth <= 1024 || window.innerWidth <= 1024;

    if (!isCompactViewport) {
        controls.style.left = '';
        controls.style.right = '';
        controls.style.top = '';
        controls.style.bottom = '';
        controls.style.width = '';
        controls.style.maxWidth = '';
        controls.style.zIndex = '';
        return;
    }

    const sideInset = viewportWidth <= 640 ? 16 : 30;
    const bottomInset = viewportWidth <= 640 ? 18 : 28;
    const controlsHeight = controls.getBoundingClientRect().height || controls.offsetHeight || 24;

    controls.style.left = `${Math.round(viewportLeft + sideInset)}px`;
    controls.style.right = 'auto';
    controls.style.bottom = 'auto';
    controls.style.top = `${Math.round(viewportTop + viewportHeight - controlsHeight - bottomInset)}px`;
    controls.style.width = 'auto';
    controls.style.maxWidth = `${Math.max(0, Math.round(viewportWidth - sideInset * 2))}px`;
    controls.style.zIndex = '2000';
}


function updateControlsPosition() {
    placeControlsInViewport();
    requestAnimationFrame(placeControlsInViewport);
}




function updateSlider() {

    slider.style.transform = `translateX(-${currentIndex * 100}vw)`;


    // prev button

    if (currentIndex === 0) {

        prevBtn.style.visibility = 'hidden';
        prevBtn.style.pointerEvents = 'none';

    } else {

        prevBtn.style.visibility = 'visible';
        prevBtn.style.pointerEvents = 'auto';

    }


    // next button

    if (currentIndex === totalSlides - 1) {

        nextBtn.style.visibility = 'hidden';
        nextBtn.style.pointerEvents = 'none';

    } else {

        nextBtn.style.visibility = 'visible';
        nextBtn.style.pointerEvents = 'auto';

    }


    // menu button

    if (currentIndex === 1) {

        menuBtn.style.display = 'block';
        menuBtn.style.visibility = 'hidden';
        menuBtn.style.pointerEvents = 'none';
        menuPanel.classList.remove('active');

    } else {

        menuBtn.style.display = 'block';
        menuBtn.style.visibility = 'visible';
        menuBtn.style.pointerEvents = 'auto';

    }

    if (patternToggle) {
        patternToggle.style.display = currentIndex === 15 ? 'inline-flex' : 'none';
    }

    if (mockupToggle) {
        mockupToggle.style.display = mockupSlides[currentIndex] ? 'inline-flex' : 'none';
    }

    updateControlsPosition();

}






function nextSlide() {

    if (currentIndex < totalSlides - 1) {

        currentIndex++;

        updateSlider();

    }

}






function prevSlide() {

    if (currentIndex > 0) {

        currentIndex--;

        updateSlider();

    }

}






// создание пунктов меню

slides.forEach((slide, index) => {

    const title = slide.dataset.title;

    const item = document.createElement('button');

    item.classList.add('menu-item');

    item.textContent = `${index}. ${title}`;


    item.addEventListener('click', () => {

        currentIndex = index;

        updateSlider();

        menuPanel.classList.remove('active');

    });


    menuList.appendChild(item);

});


document.querySelectorAll('.toc-item[data-slide], .section-subnav__item[data-slide]').forEach((item) => {

    item.addEventListener('click', () => {

        currentIndex = Number(item.dataset.slide);
        updateSlider();

    });

});


document.querySelectorAll('.hover-swap').forEach((image) => {

    const wrapper = document.createElement('div');
    wrapper.className = 'hover-crossfade';
    wrapper.style.width = `${image.width}px`;
    wrapper.style.aspectRatio = `${image.width} / ${image.height}`;

    const baseImage = image.cloneNode();
    const hoverImage = image.cloneNode();

    baseImage.classList.remove('hover-swap');
    baseImage.removeAttribute('data-base');
    baseImage.removeAttribute('data-hover');
    baseImage.src = image.dataset.base;
    baseImage.draggable = false;

    hoverImage.classList.remove('hover-swap');
    hoverImage.classList.add('hover-crossfade__hover');
    hoverImage.removeAttribute('data-base');
    hoverImage.removeAttribute('data-hover');
    hoverImage.src = image.dataset.hover;
    hoverImage.draggable = false;

    wrapper.appendChild(baseImage);
    wrapper.appendChild(hoverImage);
    image.replaceWith(wrapper);

});


document.querySelectorAll('.page14-tab').forEach((tab) => {

    tab.addEventListener('click', () => {

        const variant = tab.dataset.variant;

        document.querySelectorAll('.page14-tab').forEach((button) => {
            button.classList.toggle('active', button === tab);
        });

        document.querySelectorAll('.page14-text').forEach((text) => {
            text.classList.toggle('active', text.classList.contains(`page14-text--${variant}`));
        });

        document.querySelectorAll('.page14-variant').forEach((image) => {
            image.classList.toggle('active', image.classList.contains(`page14-variant--${variant}`));
        });

    });

});


document.querySelectorAll('.page8-flower-button').forEach((button) => {

    button.addEventListener('click', () => {

        const preview = document.querySelector('.page8-logo-preview');
        const logo = button.dataset.logo;

        if (!preview || !logo) {
            return;
        }

        document.querySelectorAll('.page8-flower-button').forEach((item) => {
            item.classList.toggle('active', item === button);
        });

        preview.src = logo;

    });

});


document.querySelectorAll('.page16-tab').forEach((tab) => {

    tab.addEventListener('click', () => {

        const variant = tab.dataset.variant;

        document.querySelectorAll('.page16-tab').forEach((button) => {
            button.classList.toggle('active', button === tab);
        });

        document.querySelectorAll('.page16-text').forEach((text) => {
            text.classList.toggle('active', text.classList.contains(`page16-text--${variant}`));
        });

        document.querySelectorAll('.page16-variant').forEach((image) => {
            image.classList.toggle('active', image.classList.contains(`page16-variant--${variant}`));
        });

    });

});


document.querySelectorAll('.page17-tab').forEach((tab) => {

    tab.addEventListener('click', () => {

        const variant = tab.dataset.variant;

        document.querySelectorAll('.page17-tab').forEach((button) => {
            button.classList.toggle('active', button === tab);
        });

        document.querySelectorAll('.page17-text').forEach((text) => {
            text.classList.toggle('active', text.classList.contains(`page17-text--${variant}`));
        });

        document.querySelectorAll('.page17-variant').forEach((image) => {
            image.classList.toggle('active', image.classList.contains(`page17-variant--${variant}`));
        });

        document.querySelectorAll('.page17-step').forEach((step) => {
            resetPage17Step(step);
        });

    });

});

const setPage17StepImage = (image, src, smooth = false) => {
    if (!image || !src) {
        return;
    }

    if (!smooth || image.getAttribute('src') === src) {
        image.src = src;
        image.classList.remove('is-fading');
        return;
    }

    image.classList.add('is-fading');

    window.setTimeout(() => {
        image.src = src;

        window.requestAnimationFrame(() => {
            image.classList.remove('is-fading');
        });
    }, 170);
};

const stopPage17Step = (step) => {
    if (step.dataset.timer) {
        window.clearInterval(Number(step.dataset.timer));
        delete step.dataset.timer;
    }
};

const resetPage17Step = (step) => {
    const sequence = step.dataset.sequence?.split('|') || [];
    const image = step.querySelector('img');

    stopPage17Step(step);
    step.dataset.index = String(Math.max(sequence.length - 1, 0));

    if (sequence.length && image) {
        setPage17StepImage(image, sequence[sequence.length - 1]);
    }
};

document.querySelectorAll('.page17-step').forEach((step) => {

    resetPage17Step(step);

    step.addEventListener('click', () => {

        const sequence = step.dataset.sequence?.split('|') || [];

        if (sequence.length < 2) {
            return;
        }

        const image = step.querySelector('img');

        stopPage17Step(step);
        step.dataset.index = '0';

        if (image) {
            setPage17StepImage(image, sequence[0], true);
        }

        const timer = window.setInterval(() => {
            const currentStep = Number(step.dataset.index || 0);
            const nextStep = currentStep + 1;

            if (nextStep >= sequence.length) {
                stopPage17Step(step);
                return;
            }

            step.dataset.index = String(nextStep);

            if (image) {
                setPage17StepImage(image, sequence[nextStep], true);
            }

            if (nextStep === sequence.length - 1) {
                stopPage17Step(step);
            }
        }, 520);

        step.dataset.timer = String(timer);

    });

});

document.querySelectorAll('.page23-tab').forEach((tab) => {

    tab.addEventListener('click', () => {

        const variant = tab.dataset.variant;

        document.querySelectorAll('.page23-tab').forEach((button) => {
            button.classList.toggle('active', button === tab);
        });

        document.querySelectorAll('.page23-variant').forEach((image) => {
            image.classList.toggle('active', image.classList.contains(`page23-variant--${variant}`));
        });

    });

});

document.querySelectorAll('.page28-tab').forEach((tab) => {

    tab.addEventListener('click', () => {

        const variant = tab.dataset.variant;

        document.querySelectorAll('.page28-tab').forEach((button) => {
            button.classList.toggle('active', button === tab);
        });

        document.querySelectorAll('.page28-variant').forEach((image) => {
            image.classList.toggle('active', image.classList.contains(`page28-variant--${variant}`));
        });

    });

});

document.querySelectorAll('.page30-tab').forEach((tab) => {

    tab.addEventListener('click', () => {

        const variant = tab.dataset.variant;

        document.querySelectorAll('.page30-tab').forEach((button) => {
            button.classList.toggle('active', button === tab);
        });

        document.querySelectorAll('.page30-variant').forEach((image) => {
            image.classList.toggle('active', image.classList.contains(`page30-variant--${variant}`));
        });

    });

});

document.querySelectorAll('.page31-tab').forEach((tab) => {

    tab.addEventListener('click', () => {

        const variant = tab.dataset.variant;

        document.querySelectorAll('.page31-tab').forEach((button) => {
            button.classList.toggle('active', button === tab);
        });

        document.querySelectorAll('.page31-variant').forEach((image) => {
            image.classList.toggle('active', image.classList.contains(`page31-variant--${variant}`));
        });

    });

});

document.querySelectorAll('.page36-tab').forEach((tab) => {

    tab.addEventListener('click', () => {

        const variant = tab.dataset.variant;

        document.querySelectorAll('.page36-tab').forEach((button) => {
            button.classList.toggle('active', button === tab);
        });

        document.querySelectorAll('.page36-variant').forEach((image) => {
            image.classList.toggle('active', image.classList.contains(`page36-variant--${variant}`));
        });

        document.querySelectorAll('.page36-text').forEach((text) => {
            text.classList.toggle('active', text.classList.contains(`page36-text--${variant}`));
        });

    });

});

document.querySelectorAll('.page41-tab').forEach((tab) => {

    tab.addEventListener('click', () => {

        const variant = tab.dataset.variant;

        document.querySelectorAll('.page41-tab').forEach((button) => {
            button.classList.toggle('active', button === tab);
        });

        document.querySelectorAll('.page41-variant').forEach((image) => {
            image.classList.toggle('active', image.classList.contains(`page41-variant--${variant}`));
        });

    });

});


if (patternToggle) {

    let patternMode = 'pattern';

    patternToggle.addEventListener('click', () => {

        patternMode = patternMode === 'pattern' ? 'colors' : 'pattern';

        const isColors = patternMode === 'colors';

        patternToggle.textContent = isColors ? 'Паттерн' : 'Цветовые решения';
        patternToggle.classList.toggle('active', isColors);

        document.querySelectorAll('.page15-title').forEach((title) => {
            title.classList.toggle('active', title.classList.contains(isColors ? 'page15-title--colors' : 'page15-title--pattern'));
        });

        document.querySelectorAll('.page15-text').forEach((text) => {
            text.classList.toggle('active', text.classList.contains(isColors ? 'page15-text--colors' : 'page15-text--pattern'));
        });

        document.querySelectorAll('.page15-image').forEach((image) => {
            image.classList.toggle('active', image.classList.contains(isColors ? 'page15-image--colors' : 'page15-image--pattern'));
        });

    });

}


if (mockupToggle && mockupModal) {

    const closeMockupModal = () => {
        mockupModal.classList.remove('active');
        mockupModal.setAttribute('aria-hidden', 'true');
    };

    const openMockupModal = () => {
        const mockup = { ...mockupSlides[currentIndex] };

        if (currentIndex === 23) {
            const activeVariant = document.querySelector('.page23-tab.active')?.dataset.variant;
            mockup.src = activeVariant === 'variant2' ? 'images/мокап/евробуклет2.png' : 'images/мокап/евробуклет1.png';
            mockup.alt = activeVariant === 'variant2' ? 'Мокап евробуклета вариант 2' : 'Мокап евробуклета вариант 1';
        }

        if (currentIndex === 28) {
            const activeVariant = document.querySelector('.page28-tab.active')?.dataset.variant || 'variant1';
            const variantNumber = activeVariant.replace('variant', '');
            mockup.src = `images/мокап/футболка${variantNumber}.png`;
            mockup.alt = `Мокап футболки вариант ${variantNumber}`;
        }

        if (currentIndex === 30) {
            const activeVariant = document.querySelector('.page30-tab.active')?.dataset.variant || 'variant1';
            const variantNumber = activeVariant.replace('variant', '');
            mockup.src = `images/мокап/баннер${variantNumber}.png`;
            mockup.alt = `Мокап баннера вариант ${variantNumber}`;
        }

        if (currentIndex === 31) {
            const activeVariant = document.querySelector('.page31-tab.active')?.dataset.variant || 'variant1';
            const variantNumber = activeVariant.replace('variant', '');
            mockup.src = `images/мокап/плакат${variantNumber}.png`;
            mockup.alt = `Мокап плаката вариант ${variantNumber}`;
        }

        if (currentIndex === 36) {
            const activeVariant = document.querySelector('.page36-tab.active')?.dataset.variant || 'variant1';
            const variantNumber = activeVariant.replace('variant', '');
            mockup.src = `images/мокап/коробка${variantNumber}.png`;
            mockup.alt = `Мокап коробка вариант ${variantNumber}`;
        }

        if (currentIndex === 41) {
            const activeVariant = document.querySelector('.page41-tab.active')?.dataset.variant || 'variant1';
            const variantNumber = activeVariant.replace('variant', '');
            mockup.src = `images/мокап/посты${variantNumber}.png`;
            mockup.alt = `Мокап постов вариант ${variantNumber}`;
        }

        if (mockup && mockupModalImage) {
            mockupModalImage.src = mockup.src;
            mockupModalImage.alt = mockup.alt;
        }

        mockupModal.classList.add('active');
        mockupModal.setAttribute('aria-hidden', 'false');
    };

    mockupToggle.addEventListener('click', openMockupModal);

    mockupModal.querySelectorAll('.mockup-modal__backdrop').forEach((button) => {
        button.addEventListener('click', closeMockupModal);
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && mockupModal.classList.contains('active')) {
            closeMockupModal();
        }
    });

}


// перейти к содержанию

menuBtn.addEventListener('click', () => {

    currentIndex = 1;
    menuPanel.classList.remove('active');
    updateSlider();

});


let touchStartX = 0;
let touchStartY = 0;
let touchStartTime = 0;

slider.addEventListener('touchstart', (event) => {
    if (event.touches.length !== 1 || event.target.closest('button, .mockup-modal.active')) {
        return;
    }

    touchStartX = event.touches[0].clientX;
    touchStartY = event.touches[0].clientY;
    touchStartTime = Date.now();
}, { passive: true });

slider.addEventListener('touchend', (event) => {
    if (!touchStartTime) {
        return;
    }

    const touch = event.changedTouches[0];
    const deltaX = touch.clientX - touchStartX;
    const deltaY = touch.clientY - touchStartY;
    const elapsed = Date.now() - touchStartTime;

    touchStartTime = 0;

    if (elapsed > 700 || Math.abs(deltaX) < 52 || Math.abs(deltaX) < Math.abs(deltaY) * 1.25) {
        return;
    }

    if (deltaX < 0) {
        nextSlide();
    } else {
        prevSlide();
    }
}, { passive: true });


window.addEventListener('resize', updateControlsPosition);

if (window.visualViewport) {
    window.visualViewport.addEventListener('resize', updateControlsPosition);
    window.visualViewport.addEventListener('scroll', updateControlsPosition);
}




updateSlider();
