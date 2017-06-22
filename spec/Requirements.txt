# Laser Maze With Prisms And Mirrors

## READ THIS FIRST -- IT'S IMPORTANT

The purpose of this coding assignment is for you to show us the most beautiful code you can write. Please make sure your code
is well-documented
is modular
is object-oriented
uses appropriate data structures for fast calculation (e.g., don't use O(n) alg when it could have been O(’| ), especially for infinite loop detection (see below))
is extensible (explained in the section below this one)

## EXTENSIBILITY

Your code should be extensible, by which we mean that you could enhance your code to accommodate a new kind of mirror or prism (explained in the problem statement below) without modifying any of
the existing methods, but only by defining a new class and its methods.

## INFINITE LOOP DETECTION
Your code should detect an infinite loop (explained in the problem statement below) as soon as it occurs, and should do so in O(’| ) time (i.e., independent of the length of the path.)

## PROBLEM STATEMENT

In a rectangular room sits a laser that is about to be fired toward the east wall. Inside the room a certain number of prisms and mirrors have been placed. They alter the direction of the laser if it hits
them. You want to know how far the laser will travel before it hits a wall, taking into account the direction-altering properties of the prisms and mirrors that it might hit along the way.

There are four kinds of prisms: north-facing (denoted "/‘"), east-facing (denoted  west-facing (denoted "<"), and south-facing prisms (denoted "v" (lower-case vee)). If the laser strikes an east-facing
prism, its course will be altered to be East, regardless of what direction it had been going in before. If it hits a south-facing prism, its course will be altered to be South, and so on.

There are three kinds of mirrors: 90-degree facing north-east (denoted "\"), 90-degree facing south-east (denoted ("/"), and 180 degree (denoted "0"). Mirrors of the 90 degree variety deflect the laser by
90 degrees. There are two ways to deflect the laser by 90 degrees, and there is one kind of mirrorfor each way. Mirrors of the 180 degree variety deflect the laser back in the direction it came.

## INPUT

Your program should read the input from standard input, which contains the data describing the room setup. This room description is a string with embedded newline (\n) characters that separate the
string into multiple lines. Each line from the input represents a row in the room. The characters inside each row denote the placement of the objects on that row.

The last line of input might or might not end with a newline character and your code must handle either case.

Your program will have to determine the number of rows and columns implicit in input. However, the number of lines of input will be at most 50. Each line will contain the same number of characters.
The room description contains exactly one '@' character, representing the laser's position in the room. It may contain any number of object markers from the set ["<",      "0"], which
represent prisms and mirrors. All other locations in the room are indicated with the character (this is a hyphen, not an underscore). Whitespace is not significant, other than newlines separating rows.
Each prism (<, A, v, >) affects the laser by redirecting the laser in the indicated direction. For example, if the laser hits a 'v' object, it will be directed south. (Note that the 'v' symbol is a lower-case 'v', not an
upper-case 'V'.)

A "/" mirror reflects an eastward beam to the north (and vice versa), and a westward beam to the south (and vice versa). A "\" mirror has the opposite behavior (e.g. an eastward beam is reflected to the
south). An "0" mirror reflects an eastward beam west (and vice versa), and a southward beam north (and vice-versa).

## OUTPUT

Your program must output to standard-out an integer representing the distance that the laser will travel before hitting a wall. For example, if the laser travels a distance of 14 cells before hitting a wall,
then your program should call console.log("14") [javascript], or puts("14") [java]. Your program should treat the  symbol the same as the character, that is, as empty space, meaning that the laser
will pass through the original location from which it was fired.

If the laser will get caught in an infinite loop, then -1 must be returned. Take special caution with test case 13! Also, your infinite loop detection should detect the infinite loop fairly soon after it occurs. For
example, it is not acceptable for the laser to travel twice through the same loop before the loop is detected.

Your program will be run on several test cases. It must output the correct response to standard output in each test case, and that is the ONLY thing that must be printed to standard output. If your program
prints out anything else beside the number of steps taken by the laser, it will fail the test case.

