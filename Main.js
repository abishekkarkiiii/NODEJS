const { add } = require('./Add');
const { subtract } = require('./Subtract');
const { divide } = require('./Divide');
const { m: multiply } = require('./M');

let user = (req, res) => {

    if (req.url === "/" && req.method === "GET") {
        res.setHeader("Content-Type", "text/html");
        res.write(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Simple Calculator</title>
        </head>
        <body>
            <h2>Simple Calculator</h2>
            <!-- Form to take two numbers and select an operation -->
            <form action="/calculate" method="POST">
                <label for="num1">First Number:</label><br>
                <input type="number" id="num1" name="num1" required><br><br>

                <label for="num2">Second Number:</label><br>
                <input type="number" id="num2" name="num2" required><br><br>

                <label>Select Operation:</label><br>
                <input type="radio" id="add" name="operation" value="+" required>
                <label for="add">Add</label><br>

                <input type="radio" id="subtract" name="operation" value="-">
                <label for="subtract">Subtract</label><br>

                <input type="radio" id="multiply" name="operation" value="*">
                <label for="multiply">Multiply</label><br>

                <input type="radio" id="divide" name="operation" value="/">
                <label for="divide">Divide</label><br><br>

                <input type="submit" value="Calculate">
            </form>
        </body>
        </html>
        `);
        res.end();
    } 
    
    else if (req.url === '/calculate' && req.method === 'POST') {
        let arr = [];
        req.on('data', (chunk) => {
            arr.push(chunk);
        });

        req.on('end', () => {
            let obj = Object.fromEntries(new URLSearchParams(Buffer.concat(arr).toString()));
            let num1 = parseFloat(obj.num1);
            let num2 = parseFloat(obj.num2);
            let result;

            // Perform the operation based on the input
            if (obj.operation === '*') {
                result = multiply(num1, num2);
            } else if (obj.operation === '+') {
                result = add(num1, num2);
            } else if (obj.operation === '-') {
                result = subtract(num1, num2);
            } else if (obj.operation === '/') {
                result = divide(num1, num2);
            }

            // Send the result back to the client
            res.setHeader("Content-Type", "text/html");
            res.write(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Calculation Result</title>
            </head>
            <body>
                <h2>Calculation Result: ${result}</h2>
                <a href="/">Go back</a>
            </body>
            </html>
            `);
            res.end();
        });

    } else {
        // Redirect to home for any other requests
        res.statusCode = 302;
        res.setHeader('Location', '/');
        res.end();
    }
};

exports.user = user;
