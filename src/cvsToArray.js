/**
 * Added by: July 06, 2021 - Justin Velarde
 * 
 * @module CSV - A module that can be used for converting the contents of comma-delimited csv files
 * into a javascript object or json array
 */
"use strict";



class Csv{
    /**
     * Initialize connection with the file reader
     * @param {*} selector 
     */
    constructor(){
        this.reader = new FileReader();
    }

    /**
     * Read file contents
     * @method a private method
     * @return array
     */
    #readFile(file){
        return new Promise((req, res) => {

            // displays the data submitted on loadend
            this.reader.addEventListener("loadend", e => req(e.target.result));

            // displays the error message
            this.reader.addEventListener("error", res);

            // read the file
            this.reader.readAsText(file);

        });
    }

    /**
     * Converts the CSV file into json
     * @method a private method
     * @param {*} data The csv's data
     * @param {*} headers check if data has headers
     * @param {*} isJSON checks if the output should is in JSON object
     * @returns 
     */
    #convertToArray(data, headers, isJSON = false){
        const outputArray = [];

        /**  
         * The Regex Delimiter structure for the comma in csv 
         * I used this structure to disregard the commas inside each value of columns
         * ,               ','
         * (?=             look ahead to see if there is:
         * (?:             group, but do not capture (0 or more times):
         * (?:             group, but do not capture (2 times):
         * [^"]*          any character except: '"' (0 or more times)
         *  "              '"'
         * ){2}            end of grouping
         * )*              end of grouping
         * [^"]*          any character except: '"' (0 or more times)
         * $               before an optional \n, and the end of the string
         * )               end of look-ahead 
         * 
         **/

        // Check if with headers
        if(headers === true){
            // splits each lines
            let csvlines = data.trim().split('\n');

            // splits the csv header
            let headers = csvlines[0].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/).map(s => s.replace(/"/gi, '').trim());

            for(var i = 1; i < csvlines.length; i++){
                
                let obj = {};

                // split the current line's columns
                let currentLine = csvlines[i].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/).map(s => s.replace(/"/gi, '').trim());

                for(var h = 0; h < headers.length; h++){
                    obj[headers[h]] = currentLine[h];
                }

                // append new data into the array
                outputArray.push(obj);
            }

        }else{
            // split each columns
            let arrayCSV = data.trim().split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/).map(s => s.replace(/"/gi, '').trim());

            for(var i = 1; i < arrayCSV.length; i++){
                // append new data into the array
                outputArray.push(arrayCSV[i]);
            }
        }
        
        // Return the array
        return (isJSON === true) ? JSON.stringify(outputArray) : outputArray;
    }


    /**
     * Converts the contents of the csv file into a JSON Arrays
     * @method public method
     * @param contents the file contents
     * @param withHeaders if data has headers
     * @return array
     */
    async convert(contents, withHeaders = false, json = false){
        try{
            return this.#convertToArray(
                await this.#readFile(contents), 
                withHeaders,
                json
            );
        }catch(e){
            console.log(e.message);
        }
    }
}


// export the contents of this module 
export default Csv;