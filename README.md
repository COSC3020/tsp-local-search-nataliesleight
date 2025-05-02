# Traveling Salesperson Problem -- Local Search

This exercise is about the Traveling Salesperson Problem I mentioned in the
lecture on NP-hard problems -- given a set of cities, determine the length of
the shortest tour that visits all of them. We can get from any city to any other
city, i.e. the graph of cities is completely connected. We consider the version
of the Traveling Salesperson Problem that finds the shortest tour to visit $n$
cities, starting at a city and ending at the $n$ th city; it *does not* go
back to the start. The start city may be any of the cities. Remember that the
graph for a TSP is undirected, i.e. the cost is the same in either direction.

The 2-opt algorithm for solving the Traveling Salesperson Problem is a
randomized local search algorithm that, at each iteration, reverses part of the
route. It starts with a random route (this is the randomized part), and changes
part of the route in each step (this is the local search part, sprinkled with
more randomness). The pseudocode for one iteration is as follows:

```javascript
2optSwap(route, i, k)
  cities 1 to i-1 stay in the order they are
  cities i to k are reversed
  cities k + 1 to n stay in the order they are
```

For example, if I call the above function with route A--B--C--D--E--F, $i=2$,
$k=4$, the resulting route is A--B--E--D--C--F.

The algorithm starts with a random route; if the new route at the end of an
iteration decreases the total length, it is retained as the current incumbent.
The incumbent after the final iteration is returned as the solution.

Implement the 2-opt algorithm, which repeatedly runs the above steps. Your
implementation needs to fix two design parameters that I have left open. First,
you need to design a stopping criterion -- when would it make sense to stop and
return the shortest route found so far rather than trying another iteration?
Second, design a way to choose $i$ and $k$ -- note that they need to be
different in subsequent iterations, as one iteration would simply undo what
the previous one did otherwise. Start with the template I provided in `code.js`.
Describe in your code how you designed your stopping criterion and ways of
choosing $i$ and $k$ and why.

The function takes a distance matrix (the adjacency matrix for the graph where
the values in the cells are the distances between the corresponding cities) and
returns the length of the shortest tour (not the tour itself).

Test your new function; I've provided some basic testing code in `code.test.js`.

## Runtime Analysis

What is the worst-case asymptotic time complexity of your implementation? What
is the worst-case asymptotic memory complexity? Add your answer, including your
reasoning, to this markdown file.

### Time Complexity:

The time complexity is $T(n) ∈ \Theta(\frac{3n^4}{4})$. My analysis will also include the reasonings behind parts of my program. 

The main function starts off by building an array of the nodes in the graph. This takes n time. It then calls on a function that randomizes the order of the array which takes n - 2 time (for loop runs from 0 to n-2). 

After that a for loop is entered. This for loop runs n^3 times. This is an arbitrary value that I have selected and will be how many times there is a random path swap. I chose n^3 out of its ease of calculation and to give enough possible swaps to find the shortest path of that size. I initially considered n! to match the number of possible permutations but did not want to add extra complexity to calculate it. For smaller values of n, n^3 is greater than or a bit less than n! so I found it an appropriate value to use for this function. I first tried n^2 but it often was not able to find the shortest path.


Within the for loop, the values for $i$ and $k$ are generated. $i$ is generated with the range of 0 to n-2 as it could be any number except the largest index in the array because it defines the left end of the segment that is to be swapped. $k$ is generated with a range of $i$ to n-1 because it defines the right end of the segment to be swapped so it must be greater than $i$ but still within the range of the array. There is a while loop that makes sure that the previous values used to swap the path array are not consecutively used, undoing the previous swap. 

After $i$ and $k$ are generated, a swap function is called to swap the selected portion. This has a maximum time complexity of n/2, as my swap function divides the segment in half and swaps the values iteratievly. 

After the segment is swapped, a function the calculate the new path distance is called. This runs a for loop from 0 to n-2 and thus has a time complexity of n-2.

Altogether, the function, with $n$ as the number of nodes, is $n + (n - 2) + n^3(n/2 + (n-2))$ which simplifies down to $\frac{3n^4}{4} - 2n^3 + 2n - 2$. Thus for complexity $T(n) ∈ \Theta(\frac{3n^4}{4})$.

### Memory Complexity 

The memory complexity is $T(n) ∈ O(n)$. The function creates an array of size $n$. The rest of the variables are constant.



### Sources:

I used this link to find the pseudocode for my path randomize function: https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle

I used this link to find out how to round up: https://www.w3schools.com/jsref/jsref_ceil.asp

I used this link to find out how to get randomized numbers in a specified range: https://www.w3schools.com/js/js_random.asp 

“I certify that I have listed all sources used to complete this exercise, including the use of any Large Language Models. All of the work is my own, except where stated otherwise. I am aware that plagiarism carries severe penalties and that if plagiarism is suspected, charges may be filed against me without prior notice.” - Natalie Sleight
