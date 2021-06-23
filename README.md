# <p style="text-align: center;"> LeetCode Stats For OBS</p>

<p style="text-align: center;"> Get real-time updates for LeetCode. Can be used in OBS to automatically update
 on screen statistics for problem solving and account information.</p>

## What LeetCode Data Can Be Monitored?
- Profile Data:
    - Username
    - Github URL
    - Points
    - Star Rating
    - Reputation
    - Ranking
    - Problem Data:
        - Available Questions:
            - All questions available
            - Number of easy questions available
            - Number of medium questions available
            - Number of hard questions available
        - Total number of questions (solved and attempted)
        - Number of easy questions (solved and attempted)
        - Number of medium questions (solved and attempted)
        - Number of hard questions (solved and attempted)

        
## What Does It Do, and How Does It Work?

Great question. A user's LeetCode profile can be monitored to keep track of various statistics.
As a user solves problems, the changes are observed, and can dynamically update the values on a
recording / stream overlay! The values are each stored in independent text files, and update when 
changes are made. The functionality makes use of OBS's ability to display contents of a text file.

**Note:** Output files are not created until after the program starts. So it is important to run the program before
attempting to add source on OBS.


## How Do I get it working?
#### Running from the command line (requires Node 16):
1. Clone the Repository
   ```git clone https://github.com/APet99/LeetCode-OBS-Overlay```
2. In a command terminal, go to the directory where the repository was cloned.
   ```cd path/to/repo/```
3. Run the command ```npm install```
4.  Start the program by running ```node index.js <LeetCodeUserName>``` where <LeetCodeUserName> is the username you wish to monitor.

#### Running From Executable:
**Note:** Node is not required. It is already packaged into the executable file.
Simply run like any other program on your operating system, and you will be prompted to enter the <LeetCodeUserName> to monitor.


#### How Do I Use The Output Files In OBS?
1. In Sources, click the + to create a new source.
2. Select "Text (GDI)".
3. Name the source whatever you would like and confirm.
4. Check "Read from file", and specify the path to any of the monitored txt files. All txt files are located at ```myDrive:/path/to/repo/results```.
5. Click "OK".
6. Wait for changes to happen on LeetCode, and the overlay should now update the values!

<br>
<br>
<br>
<br>
<br>
#### LICENSE

> MIT License
>
> Copyright (c) 2021 Alex Peterson
>
> Permission is hereby granted, free of charge, to any person obtaining a copy
> of this software and associated documentation files (the "Software"), to deal
> in the Software without restriction, including without limitation the rights
> to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
> copies of the Software, and to permit persons to whom the Software is
> furnished to do so, subject to the following conditions:
>
> The above copyright notice and this permission notice shall be included in all
> copies or substantial portions of the Software.
>
> THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
> IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
> FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
> AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
> LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
> OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
> SOFTWARE.