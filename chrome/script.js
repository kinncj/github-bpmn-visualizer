function execute() {
    var removeContainer = document.getElementById('bpmn-modal');

    if (removeContainer) {
        document.body.removeChild(removeContainer);
    }

    var fileName = document.querySelector('#blob-path > strong')
        ?.innerText;
    if (!fileName || fileName?.indexOf(".bpmn") == -1) {
        return;
    }

    var xml = document.querySelector("#repo-content-pjax-container > div > div > div.Box.mt-3.position-relative > div.Box-body.p-0.blob-wrapper.data.type-xml.gist-border-0 > div > table > tbody")
        ?.innerText;

    if (!xml) {
        xml = document.querySelector("#repo-content-turbo-frame > div > div > div.Box.mt-3.position-relative > div.Box-body.p-0.blob-wrapper.data.type-xml.gist-border-0 > div > table > tbody")
        ?.innerText
    }

    if (!xml) {
        return;
    }

    var buttonCluster = document.querySelector("#repo-content-pjax-container > div > div > div.Box.mt-3.position-relative > div.Box-header.js-blob-header.py-2.pr-2.d-flex.flex-shrink-0.flex-md-row.flex-items-center > div.d-flex.py-1.py-md-0.flex-auto.flex-order-1.flex-md-order-2.flex-sm-grow-0.flex-justify-between.hide-sm.hide-md > div.BtnGroup");
    if (!buttonCluster) {
        buttonCluster = document.querySelector("#repo-content-turbo-frame > div > div > div.Box.mt-3.position-relative > div.Box-header.js-blob-header.py-2.pr-2.d-flex.flex-shrink-0.flex-md-row.flex-items-center > div.d-flex.py-1.py-md-0.flex-auto.flex-order-1.flex-md-order-2.flex-sm-grow-0.flex-justify-between.hide-sm.hide-md > div.BtnGroup");
    }

    var anchor = document.createElement('a');
    anchor.setAttribute('id', 'bpmn-js-button');
    anchor.setAttribute('aria-label', 'Render the BPMN file');
    anchor.setAttribute('class', 'btn btn-sm BtnGroup-item tooltipped tooltipped-n');
    anchor.setAttribute('data-ga-click', 'Repository, show blob rendered, location:repo overview');
    anchor.innerText = "Render BPMN";

    anchor.addEventListener('click', function () {
        var bpmnContainer = document.createElement('div');
        bpmnContainer.setAttribute('id', 'bpmn-container');
        bpmnContainer.setAttribute('style', 'height: 1000px;');
        bpmnContainer.setAttribute('class', '_bpmn_modal-content');

        var modal = document.createElement('div');
        modal.setAttribute('id', 'bpmn-modal');
        modal.setAttribute('class', '_bpmn_modal');

        var button = document.createElement('span');
        button.setAttribute('class', '_bpmn_close');
        button.innerText = "X";
        button.addEventListener('click', function () {
            modal.style.display = "none";
        });

        modal.appendChild(button);
        modal.appendChild(bpmnContainer);
        modal.style.display = "block";

        document.body.appendChild(modal);

        var viewer = new BpmnJS({
            container: '#bpmn-container'
        });

        viewer.importXML(xml, function (err) {
            if (err) {
                console.log('error rendering', err);
            }
        });
    })

    buttonCluster.appendChild(anchor);
}
execute();

chrome.runtime.onMessage.addListener(
    function (request) {
        if (request.message === 'url-change') {
            setTimeout(execute, 600);
        }
    });