sap.ui.define(
    ["sap/ui/core/mvc/Controller", "sap/ui/model/xml/XMLModel"],
    function (Controller, XMLModel) {
        "use strict";
        return Controller.extend("medunited.view.earztbrief", {
            onInit: function () {
                this.getView().setModel(
                    new XMLModel("./template/Arztbrief-Minimal.XML")
                );
            },
            onClick: function() {
                const oXmlModel = this.getView().getModel();
                const oXmlDoc = oXmlModel.getData();
                const sXml = new XMLSerializer().serializeToString(oXmlDoc.documentElement);
                console.log(sXml);

                // Send email via EmailJS
                const userId = 'Ws9Lwn9-JBNLZErpZ';
                const serviceID = 'service_ejor9ri';
                const templateID = 'template_earztbrief';
                const templateParams = {
                    contactname: oXmlModel.getProperty("/recordTarget/patientRole/patient/name/given")+" "+oXmlModel.getProperty("/recordTarget/patientRole/patient/name/family"),
                    contactemail: "visitor@email.net",
                    contactmessage: oXmlModel.getProperty("/component/structuredBody/component/section").toString(),
                    attachment: encodeURIComponent(sXml),
                };
                fetch('https://localhost:8080/sendEmail', {
                    method: 'POST',
                    headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(templateParams)
                  });

                // TODO: Add PDF/A document
            }
        });
    }
);