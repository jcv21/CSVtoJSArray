import Csv from './src/cvsToArray.js';


document.querySelector("#btn").addEventListener("click", function(){
    const file = document.querySelector("#file").files[0];
    const uploadedFile = new Csv();
    (async () => {
        const output = await uploadedFile.convert(file, true);
        let rows = "";

        for(var i = 0; i < output.length; i++){
            rows += `<tr>
                        <td>${output[i].registration_number}</td>
                        <td>${output[i].generic_name}</td>
                        <td>${output[i].dosage_strength}</td>
                        <td>${output[i].brand_name}</td>
                    </tr>`;
        }

        document.querySelector("#data").innerHTML = rows;
    })();
});