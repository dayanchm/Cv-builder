function selectPdf(element) {
    var allPdfs = document.getElementsByClassName('pdf-item');
    for (var i = 0; i < allPdfs.length; i++) {
        allPdfs[i].classList.remove('selected');
    }
    element.classList.add('selected');
    var selectedPdf = element.querySelector('a').getAttribute('href');
    console.log('Seçilen PDF: ' + selectedPdf);

}


function logFormData() {
    var currentStepInputs = document.querySelector('.step.active').getElementsByTagName('input');
    var currentStepSelects = document.querySelector('.step.active').getElementsByTagName('select');
    var currentStepTextareas = document.querySelector('.step.active').getElementsByTagName('textarea');

    var formData = {};
    for (var i = 0; i < currentStepInputs.length; i++) {
        var input = currentStepInputs[i];
        formData[input.name || input.id || 'input'+i] = input.value;
    }
    for (var j = 0; j < currentStepSelects.length; j++) {
        var select = currentStepSelects[j];
        formData[select.name || select.id || 'select'+j] = select.value;
    }
    for (var k = 0; k < currentStepTextareas.length; k++) {
        var textarea = currentStepTextareas[k];
        formData[textarea.name || textarea.id || 'textarea'+k] = textarea.value;
    }

    console.log('Form Verileri:', formData);
}

function nextStep() {
    logFormData();
    var totalSteps = document.getElementsByClassName("step").length;
    if (currentStep < totalSteps - 1) {
        currentStep++;
        showStep(currentStep);
    }
}

async function nextStepWithLoading() {
        nextStep();
        Swal.fire('Hata!', error.toString(), 'error');
}


var currentStep = 0;
showStep(currentStep);

function showStep(n) {
    var steps = document.getElementsByClassName("step");
    var totalSteps = steps.length;
    for (var i = 0; i < totalSteps; i++) {
        steps[i].style.display = "none";
    }
    steps[n].style.display = "block";
    updateProgressBar(n);
}

function nextStep() {
    var totalSteps = document.getElementsByClassName("step").length;
    if (currentStep < totalSteps - 1) {
        currentStep++;
        showStep(currentStep);
    }
}

function prevStep() {
    if (currentStep > 0) {
        currentStep--;
        showStep(currentStep);
    }
}

function updateProgressBar(n) {
    var progressSteps = document.querySelectorAll('.progress-bar li');
    for (var i = 0; i < progressSteps.length; i++) {
        progressSteps[i].classList.remove('active', 'completed');
        if (i < n) {
            progressSteps[i].classList.add('completed');
        }
    }
    progressSteps[n].classList.add('active');
}

// İş Deneyimi 

function toggleWorkExperience() {
    var container = document.getElementById('workExperienceContainer');
    var icon = document.getElementById('toggleIcon');

    if (container.style.display === 'none') {
        container.style.display = 'block';
        icon.innerText = '-';
    } else {
        container.style.display = 'none';
        icon.innerText = '+';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    var container = document.getElementById('workExperienceContainer');

    // Check if the container has no child elements, then add a default entry
    if (container.childElementCount === 0) {
        addDefaultWorkExperience(container);
    }

    container.style.display = 'none';
});

function addDefaultWorkExperience(container, index) {
    // Create a default entry
    var defaultEntry = document.createElement('div');
    defaultEntry.classList.add('work-experience');
    defaultEntry.id = 'experiences_' + index;

    var inputNames = ['jobTitle', 'city', 'employer', 'startDate', 'endDate'];

    inputNames.forEach(function (name) {
        var input = document.createElement('input');
        input.type = 'text';
        input.name = 'experiences_' + index + '_' + name;
        input.placeholder = name.charAt(0).toUpperCase() + name.slice(1) + ' Örn.';

        defaultEntry.appendChild(input);
    });

    var textarea = document.createElement('textarea');
    textarea.name = 'experiences_' + index + '_description';
    textarea.placeholder = 'Açıklama';

    defaultEntry.appendChild(textarea);

    // Add Remove button
    var removeBtn = document.createElement('button');
    removeBtn.innerText = 'Sil';
    removeBtn.setAttribute('onclick', 'removeWorkExperience(this)');
    removeBtn.classList.add('remove-btn');
    defaultEntry.appendChild(removeBtn);

    // Append the default entry to the container
    container.appendChild(defaultEntry);
}

function addWorkExperience() {
    var container = document.getElementById('workExperienceContainer');
    var newIndex = container.children.length; // Get the current count of child elements
    addDefaultWorkExperience(container, newIndex);
    console.log('Added work experience entry:', newIndex);
}
function removeWorkExperience(button) {
    var entry = button.parentNode;
    var container = entry.parentNode;
    container.removeChild(entry);
}

// Yetenekler

// Function to toggle skills
function toggleskills() {
    var container = document.getElementById('workskills');
    var icon = document.getElementById('togglead');

    if (container.style.display === 'none') {
        container.style.display = 'block';
        icon.innerText = '-';
    } else {
        container.style.display = 'none';
        icon.innerText = '+';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    var container = document.getElementById('workskills');
    container.style.display = 'none';
});

// Function to add skills
function addskills() {
    var container = document.getElementById('workskills');
    var newEntry = container.lastElementChild.cloneNode(true);

    newEntry.querySelector('input[name="skilles[0][skil]"]').value = '';

    var existingRemoveBtn = newEntry.querySelector('.remove-btn');
    if (existingRemoveBtn) {
        existingRemoveBtn.parentNode.removeChild(existingRemoveBtn);
    }

    var removeBtn = document.createElement('button');
    removeBtn.innerText = 'Sil';
    removeBtn.setAttribute('onclick', 'removeSkill(this)');
    removeBtn.classList.add('remove-btn');

    newEntry.appendChild(removeBtn);
    container.appendChild(newEntry);

    // Limit the displayed skills to the first 5
    limitDisplayedItems(container, 5);
}

function removeSkill(button) {
    var entry = button.parentNode;
    var container = entry.parentNode;
    container.removeChild(entry);
}

function togglelangs() {
    var container = document.getElementById('worklangs');
    var icon = document.getElementById('togglelang');

    if (container.style.display === 'none') {
        container.style.display = 'block';
        icon.innerText = '-';
    } else {
        container.style.display = 'none';
        icon.innerText = '+';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    var container = document.getElementById('worklangs');
    container.style.display = 'none';
});

function addlangs() {
    var container = document.getElementById('worklangs');
    var newEntry = container.lastElementChild.cloneNode(true);

    newEntry.querySelector('input[name="langs[0][lang]"]').value = '';

    var existingRemoveBtn = newEntry.querySelector('.remove-btn');
    if (existingRemoveBtn) {
        existingRemoveBtn.parentNode.removeChild(existingRemoveBtn);
    }

    var removeBtn = document.createElement('button');
    removeBtn.innerText = 'Sil';
    removeBtn.setAttribute('onclick', 'removeLang(this)');
    removeBtn.classList.add('remove-btn');

    newEntry.appendChild(removeBtn);
    container.appendChild(newEntry);

    // Limit the displayed languages to the first 5
    limitDisplayedItems(container, 5);
}

function removeLang(button) {
    var entry = button.parentNode;
    var container = entry.parentNode;
    container.removeChild(entry);
}

function limitDisplayedItems(container, maxCount) {
    var entries = container.getElementsByClassName('work-experience');
    if (entries.length > maxCount) {
        for (var i = maxCount; i < entries.length; i++) {
            container.removeChild(entries[i]);
        }
    }
}


// About Karakter Sınırı
var isLimitExceeded = false;  

function updateCharacterCount(textarea) {
    var characterCountElement = document.getElementById('characterCount');
    var currentCharacterCount = textarea.value.length;

    if (!isLimitExceeded) {
        if (currentCharacterCount >= 500) {
            characterCountElement.textContent = '500/500';
            characterCountElement.style.color = 'red';
            isLimitExceeded = true;  
            textarea.value = textarea.value.substring(0, 500);  
        } else {
            characterCountElement.textContent = currentCharacterCount + '/500';
            characterCountElement.style.color = 'black';
        }
    } else {
        isLimitExceeded = false;
        characterCountElement.textContent = currentCharacterCount + '/500';
        characterCountElement.style.color = 'black';
    }
}


// Referance

function toggleReferanceExperience() {
    var container = document.getElementById('referanceExperienceContainer');
    var icon = document.getElementById('toggleAdds');

    if (container.style.display === 'none') {
        container.style.display = 'block';
        icon.innerText = '-';
    } else {
        container.style.display = 'none';
        icon.innerText = '+';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    var container = document.getElementById('referanceExperienceContainer');
    if (container.childElementCount === 0) {
        addDefaultReferanceExperience(container);
    }

    container.style.display = 'none';
});

function addDefaultReferanceExperience(container, index) {
    var defaultEntry = document.createElement('div');
    defaultEntry.classList.add('work-experience');
    defaultEntry.id = 'referance_' + index;

    var inputNames = ['jobTitle', 'city', 'employer', ];

    inputNames.forEach(function (name) {
        var input = document.createElement('input');
        input.type = 'text';
        input.name = 'referance_' + index + '_' + name;

        defaultEntry.appendChild(input);
    });

    var textarea = document.createElement('textarea');
    textarea.name = 'referance_' + index + '_description';

    var removeBtn = document.createElement('button');
    removeBtn.innerText = 'Sil';
    removeBtn.setAttribute('onclick', 'removeReferanceExperience(this)');
    removeBtn.classList.add('remove-btn');
    defaultEntry.appendChild(removeBtn);

    container.appendChild(defaultEntry);
}

function addReferanceExperience() {
    var container = document.getElementById('referanceExperienceContainer');
    var newIndex = container.children.length; // Get the current count of child elements
    addDefaultReferanceExperience(container, newIndex);
    console.log('Added work experience entry:', index);
}
function removeReferanceExperience(button) {
    var entry = button.parentNode;
    var container = entry.parentNode;
    container.removeChild(entry);
}