const totalQuestions = 32; // Total de preguntas
let answers = {};

function selectOption(questionNumber, selectedOption) {
    const options = document.querySelectorAll('#question' + questionNumber + ' .option');
    options.forEach(option => option.classList.remove('selected'));

    const selectedIndex = selectedOption.charCodeAt(0) - 65; // 'A' corresponde a 0, 'B' a 1, etc.
    options[selectedIndex].classList.add('selected');
    answers['question' + questionNumber] = [selectedOption];
}

function selectMultipleOptions(questionNumber, selectedOption) {
    if (!answers['question' + questionNumber]) {
        answers['question' + questionNumber] = [];
    }
    const options = document.querySelectorAll('#question' + questionNumber + ' .option');
    const optionIndex = selectedOption.charCodeAt(0) - 65;

    if (answers['question' + questionNumber].includes(selectedOption)) {
        answers['question' + questionNumber] = answers['question' + questionNumber].filter(opt => opt !== selectedOption);
        options[optionIndex].classList.remove('selected');
    } else if (answers['question' + questionNumber].length < 3) {
        answers['question' + questionNumber].push(selectedOption);
        options[optionIndex].classList.add('selected');
    }
}

function selectImage(questionNumber, selectedImage) {
    const images = document.querySelectorAll('#question' + questionNumber + ' .image-option');
    images.forEach(image => image.classList.remove('selected'));

    const selectedIndex = selectedImage - 1;
    images[selectedIndex].classList.add('selected');
    answers['question' + questionNumber] = [selectedImage];
}

function finishQuiz() {
    // Verifica que todas las preguntas han sido respondidas y la pregunta 6 tenga una sola opción seleccionada
    if (Object.keys(answers).length < totalQuestions || !answers['question9'] || answers['question9'].length !== 3) {
        document.getElementById('feedback').style.display = 'block';
        return;
    } else {
        document.getElementById('feedback').style.display = 'none';
    }

    const correctAnswers = {
        question1: ['C'],
        question2: ['C'],
        question3: ['B'],
        question4: ['A'],
        question5: ['B'],
        question6: ['4'],
        question7: ['C'],
        question8: ['A'],
        question9: ['A', 'B', 'F'],
        question10: ['A'],
        question11: ['A'],
        question12: ['A'],
        question13: ['1'],
        question14: ['C'],
        question15: ['C'],
        question16: ['A'],
        question17: ['B'],
        question18: ['A'],
        question19: ['C'],
        question20: ['C'],
        question21: ['C'],
        question22: ['2'],
        question23: ['B'],
        question24: ['B'],
        question25: ['C'],
        question26: ['A'],
        question27: ['C'],
        question28: ['C'],
        question29: ['4'],
        question30: ['A'],
        question31: ['C'],
        question32: ['4']
    };

    let correctCount = 0;
    let resultText = '';

    for (let i = 1; i <= totalQuestions; i++) {
        const userAnswer = answers['question' + i] || [];
        const correctAnswer = correctAnswers['question' + i] || [];

        if (i === 9) {
            // Pregunta 9 tiene múltiples respuestas
            if (userAnswer.sort().join() === correctAnswer.sort().join()) {
                correctCount++;
                resultText += `<p>Pregunta ${i}: <span class="correct">Correcto</span></p>`;
            } else {
                resultText += `<p>Pregunta ${i}: <span class="incorrect">Incorrecto</span>. Las respuestas correctas son ${correctAnswer.join(', ')}.</p>`;
            }
        } else {
            if (JSON.stringify(userAnswer.sort()) === JSON.stringify(correctAnswer.sort())) {
                correctCount++;
                resultText += `<p>Pregunta ${i}: <span class="correct">Correcto</span></p>`;
            } else {
                resultText += `<p>Pregunta ${i}: <span class="incorrect">Incorrecto</span>. La respuesta correcta es ${correctAnswer.join(', ')}.</p>`;
            }
        }
    }

    const scorePercent = (correctCount / totalQuestions) * 100;
    resultText += `<p>Has respondido correctamente ${correctCount} de ${totalQuestions} preguntas (${scorePercent.toFixed(0)}%).</p>`;
    document.getElementById('result').innerHTML = resultText;
}
