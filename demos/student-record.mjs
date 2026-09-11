import {studentApplication} from './student-program.mjs?v=20260911-student1';
import {mountConsole} from './terminal.mjs?v=20260910-console2';

const downloadRow = document.getElementById('transcript-download');
const downloadLink = document.getElementById('download-transcript');
let transcriptUrl;

function clearTranscript() {
 if (transcriptUrl) URL.revokeObjectURL(transcriptUrl);
 transcriptUrl = undefined;
 downloadLink.removeAttribute('href');
 downloadLink.removeAttribute('download');
 downloadRow.hidden = true;
}

function offerTranscript({filename, text}) {
 clearTranscript();
 transcriptUrl = URL.createObjectURL(new Blob([text], {type: 'text/plain;charset=utf-8'}));
 downloadLink.href = transcriptUrl;
 downloadLink.download = filename;
 downloadLink.textContent = 'Download transcript: ' + filename;
 downloadRow.hidden = false;
}

mountConsole(write => {
 clearTranscript();
 return studentApplication(write, Math.random, offerTranscript);
});
