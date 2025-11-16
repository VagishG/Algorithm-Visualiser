export const ALGORITHMS_DATA = [
  {
    id: "linear-search",
    name: "Linear Search",
    category: "Searching",
    subcategory: "Basic Search",
    description: "A simple search algorithm that checks each element sequentially until the target is found.",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    useCase: "Small datasets, unsorted arrays, linked lists",
    code: {
      python: `def linear_search(arr, target):
    for i in range(len(arr)):
        if arr[i] == target:
            return i
    return -1

# Example
arr = [5, 2, 8, 1, 9]
result = linear_search(arr, 8)
print(result)  # Output: 2`,
      javascript: `function linearSearch(arr, target) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === target) {
            return i;
        }
    }
    return -1;
}

// Example
const arr = [5, 2, 8, 1, 9];
const result = linearSearch(arr, 8);
console.log(result);  // Output: 2`,
      java: `public class LinearSearch {
    public static int linearSearch(int[] arr, int target) {
        for (int i = 0; i < arr.length; i++) {
            if (arr[i] == target) {
                return i;
            }
        }
        return -1;
    }
    
    public static void main(String[] args) {
        int[] arr = {5, 2, 8, 1, 9};
        System.out.println(linearSearch(arr, 8));  // Output: 2
    }
}`,
    },
  },
  {
    id: "binary-search",
    name: "Binary Search",
    category: "Searching",
    subcategory: "Advanced Search",
    description:
      "An efficient search algorithm for sorted arrays that divides the search space in half with each iteration.",
    timeComplexity: "O(log n)",
    spaceComplexity: "O(1)",
    useCase: "Large sorted datasets, databases, binary search trees",
    code: {
      python: `def binary_search(arr, target):
    left, right = 0, len(arr) - 1
    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1

# Example
arr = [1, 2, 5, 8, 9, 15, 20]
result = binary_search(arr, 8)
print(result)  # Output: 3`,
      javascript: `function binarySearch(arr, target) {
    let left = 0, right = arr.length - 1;
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (arr[mid] === target) {
            return mid;
        } else if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return -1;
}

// Example
const arr = [1, 2, 5, 8, 9, 15, 20];
const result = binarySearch(arr, 8);
console.log(result);  // Output: 3`,
      java: `public class BinarySearch {
    public static int binarySearch(int[] arr, int target) {
        int left = 0, right = arr.length - 1;
        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (arr[mid] == target) {
                return mid;
            } else if (arr[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        return -1;
    }
    
    public static void main(String[] args) {
        int[] arr = {1, 2, 5, 8, 9, 15, 20};
        System.out.println(binarySearch(arr, 8));  // Output: 3
    }
}`,
    },
  },
  {
    id: "bubble-sort",
    name: "Bubble Sort",
    category: "Sorting",
    subcategory: "Elementary Sort",
    description:
      "A simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they're in the wrong order.",
    timeComplexity: "O(n²)",
    spaceComplexity: "O(1)",
    useCase: "Educational purposes, small datasets, nearly sorted data",
    code: {
      python: `def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        for j in range(0, n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
    return arr

# Example
arr = [64, 34, 25, 12, 22, 11, 90]
result = bubble_sort(arr)
print(result)  # Output: [11, 12, 22, 25, 34, 64, 90]`,
      javascript: `function bubbleSort(arr) {
    const n = arr.length;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }
    }
    return arr;
}

// Example
const arr = [64, 34, 25, 12, 22, 11, 90];
const result = bubbleSort([...arr]);
console.log(result);  // Output: [11, 12, 22, 25, 34, 64, 90]`,
      java: `public class BubbleSort {
    public static void bubbleSort(int[] arr) {
        int n = arr.length;
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n - i - 1; j++) {
                if (arr[j] > arr[j + 1]) {
                    int temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                }
            }
        }
    }
    
    public static void main(String[] args) {
        int[] arr = {64, 34, 25, 12, 22, 11, 90};
        bubbleSort(arr);
        for (int num : arr) System.out.print(num + " ");
    }
}`,
    },
  },
  {
    id: "quick-sort",
    name: "Quick Sort",
    category: "Sorting",
    subcategory: "Divide & Conquer",
    description:
      "An efficient divide-and-conquer sorting algorithm that picks a pivot element and partitions the array around it.",
    timeComplexity: "O(n log n) average, O(n²) worst",
    spaceComplexity: "O(log n)",
    useCase: "General-purpose sorting, large datasets, in-place sorting",
    code: {
      python: `def quick_sort(arr):
    if len(arr) <= 1:
        return arr
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    return quick_sort(left) + middle + quick_sort(right)

# Example
arr = [64, 34, 25, 12, 22, 11, 90]
result = quick_sort(arr)
print(result)  # Output: [11, 12, 22, 25, 34, 64, 90]`,
      javascript: `function quickSort(arr) {
    if (arr.length <= 1) return arr;
    const pivot = arr[Math.floor(arr.length / 2)];
    const left = arr.filter(x => x < pivot);
    const middle = arr.filter(x => x === pivot);
    const right = arr.filter(x => x > pivot);
    return [...quickSort(left), ...middle, ...quickSort(right)];
}

// Example
const arr = [64, 34, 25, 12, 22, 11, 90];
const result = quickSort(arr);
console.log(result);  // Output: [11, 12, 22, 25, 34, 64, 90]`,
      java: `import java.util.ArrayList;
import java.util.List;

public class QuickSort {
    public static List<Integer> quickSort(List<Integer> arr) {
        if (arr.size() <= 1) return arr;
        int pivot = arr.get(arr.size() / 2);
        List<Integer> left = new ArrayList<>();
        List<Integer> middle = new ArrayList<>();
        List<Integer> right = new ArrayList<>();
        for (int x : arr) {
            if (x < pivot) left.add(x);
            else if (x == pivot) middle.add(x);
            else right.add(x);
        }
        left = quickSort(left);
        right = quickSort(right);
        left.addAll(middle);
        left.addAll(right);
        return left;
    }
}`,
    },
  },
  {
    id: "merge-sort",
    name: "Merge Sort",
    category: "Sorting",
    subcategory: "Divide & Conquer",
    description:
      "A stable divide-and-conquer sorting algorithm that divides the array in half, recursively sorts each half, then merges them.",
    timeComplexity: "O(n log n)",
    spaceComplexity: "O(n)",
    useCase: "Guaranteed O(n log n) performance, external sorting, when stability is required",
    code: {
      python: `def merge_sort(arr):
    if len(arr) <= 1:
        return arr
    
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    
    return merge(left, right)

def merge(left, right):
    result = []
    i = j = 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1
    result.extend(left[i:])
    result.extend(right[j:])
    return result`,
      javascript: `function mergeSort(arr) {
    if (arr.length <= 1) return arr;
    const mid = Math.floor(arr.length / 2);
    const left = mergeSort(arr.slice(0, mid));
    const right = mergeSort(arr.slice(mid));
    return merge(left, right);
}

function merge(left, right) {
    const result = [];
    let i = 0, j = 0;
    while (i < left.length && j < right.length) {
        if (left[i] <= right[j]) {
            result.push(left[i++]);
        } else {
            result.push(right[j++]);
        }
    }
    return result.concat(left.slice(i)).concat(right.slice(j));
}`,
      java: `public class MergeSort {
    public static void mergeSort(int[] arr, int left, int right) {
        if (left < right) {
            int mid = left + (right - left) / 2;
            mergeSort(arr, left, mid);
            mergeSort(arr, mid + 1, right);
            merge(arr, left, mid, right);
        }
    }
    
    private static void merge(int[] arr, int left, int mid, int right) {
        int[] temp = new int[right - left + 1];
        int i = left, j = mid + 1, k = 0;
        while (i <= mid && j <= right) {
            if (arr[i] <= arr[j]) {
                temp[k++] = arr[i++];
            } else {
                temp[k++] = arr[j++];
            }
        }
        while (i <= mid) temp[k++] = arr[i++];
        while (j <= right) temp[k++] = arr[j++];
        System.arraycopy(temp, 0, arr, left, temp.length);
    }
}`,
    },
  },
  {
    id: "insertion-sort",
    name: "Insertion Sort",
    category: "Sorting",
    subcategory: "Elementary Sort",
    description:
      "A simple sorting algorithm that builds the sorted array one item at a time by inserting elements into their correct position.",
    timeComplexity: "O(n²)",
    spaceComplexity: "O(1)",
    useCase: "Small datasets, nearly sorted data, online sorting",
    code: {
      python: `def insertion_sort(arr):
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key
    return arr

# Example
arr = [64, 34, 25, 12, 22, 11, 90]
result = insertion_sort(arr)
print(result)`,
      javascript: `function insertionSort(arr) {
    for (let i = 1; i < arr.length; i++) {
        let key = arr[i];
        let j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
    return arr;
}`,
      java: `public class InsertionSort {
    public static void insertionSort(int[] arr) {
        for (int i = 1; i < arr.length; i++) {
            int key = arr[i];
            int j = i - 1;
            while (j >= 0 && arr[j] > key) {
                arr[j + 1] = arr[j];
                j--;
            }
            arr[j + 1] = key;
        }
    }
}`,
    },
  },
  {
    id: "selection-sort",
    name: "Selection Sort",
    category: "Sorting",
    subcategory: "Elementary Sort",
    description: "A simple sorting algorithm that repeatedly finds the minimum element and places it at the beginning.",
    timeComplexity: "O(n²)",
    spaceComplexity: "O(1)",
    useCase: "Educational purposes, minimal memory writes required",
    code: {
      python: `def selection_sort(arr):
    for i in range(len(arr)):
        min_idx = i
        for j in range(i + 1, len(arr)):
            if arr[j] < arr[min_idx]:
                min_idx = j
        arr[i], arr[min_idx] = arr[min_idx], arr[i]
    return arr`,
      javascript: `function selectionSort(arr) {
    for (let i = 0; i < arr.length; i++) {
        let minIdx = i;
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[j] < arr[minIdx]) {
                minIdx = j;
            }
        }
        [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
    }
    return arr;
}`,
      java: `public class SelectionSort {
    public static void selectionSort(int[] arr) {
        for (int i = 0; i < arr.length; i++) {
            int minIdx = i;
            for (int j = i + 1; j < arr.length; j++) {
                if (arr[j] < arr[minIdx]) {
                    minIdx = j;
                }
            }
            int temp = arr[i];
            arr[i] = arr[minIdx];
            arr[minIdx] = temp;
        }
    }
}`,
    },
  },
  {
    id: "heap-sort",
    name: "Heap Sort",
    category: "Sorting",
    subcategory: "Divide & Conquer",
    description:
      "A comparison-based sorting algorithm that uses a heap data structure to build a complete binary tree.",
    timeComplexity: "O(n log n)",
    spaceComplexity: "O(1)",
    useCase: "Guaranteed O(n log n) performance without extra space, priority queues",
    code: {
      python: `def heap_sort(arr):
    def heapify(n, i):
        largest = i
        left = 2 * i + 1
        right = 2 * i + 2
        
        if left < n and arr[left] > arr[largest]:
            largest = left
        if right < n and arr[right] > arr[largest]:
            largest = right
        
        if largest != i:
            arr[i], arr[largest] = arr[largest], arr[i]
            heapify(n, largest)
    
    n = len(arr)
    for i in range(n // 2 - 1, -1, -1):
        heapify(n, i)
    
    for i in range(n - 1, 0, -1):
        arr[0], arr[i] = arr[i], arr[0]
        heapify(i, 0)
    
    return arr`,
      javascript: `function heapSort(arr) {
    const heapify = (n, i) => {
        let largest = i;
        const left = 2 * i + 1;
        const right = 2 * i + 2;
        
        if (left < n && arr[left] > arr[largest]) largest = left;
        if (right < n && arr[right] > arr[largest]) largest = right;
        
        if (largest !== i) {
            [arr[i], arr[largest]] = [arr[largest], arr[i]];
            heapify(n, largest);
        }
    };
    
    const n = arr.length;
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) heapify(n, i);
    for (let i = n - 1; i > 0; i--) {
        [arr[0], arr[i]] = [arr[i], arr[0]];
        heapify(i, 0);
    }
    return arr;
}`,
      java: `public class HeapSort {
    public static void heapSort(int[] arr) {
        int n = arr.length;
        for (int i = n / 2 - 1; i >= 0; i--) heapify(arr, n, i);
        for (int i = n - 1; i > 0; i--) {
            int temp = arr[0];
            arr[0] = arr[i];
            arr[i] = temp;
            heapify(arr, i, 0);
        }
    }
    
    private static void heapify(int[] arr, int n, int i) {
        int largest = i, left = 2 * i + 1, right = 2 * i + 2;
        if (left < n && arr[left] > arr[largest]) largest = left;
        if (right < n && arr[right] > arr[largest]) largest = right;
        if (largest != i) {
            int temp = arr[i];
            arr[i] = arr[largest];
            arr[largest] = temp;
            heapify(arr, n, largest);
        }
    }
}`,
    },
  },
  {
    id: "shell-sort",
    name: "Shell Sort",
    category: "Sorting",
    subcategory: "Elementary Sort",
    description: "An optimization of insertion sort that allows the exchange of items that are far apart.",
    timeComplexity: "Depends on gap sequence, typically between O(n log n) and O(n²)",
    spaceComplexity: "O(1)",
    useCase: "Medium-sized datasets, partially sorted data",
    code: {
      python: `def shell_sort(arr):
    n = len(arr)
    gap = n // 2
    
    while gap > 0:
        for i in range(gap, n):
            temp = arr[i]
            j = i
            
            while j >= gap and arr[j - gap] > temp:
                arr[j] = arr[j - gap]
                j -= gap
            
            arr[j] = temp
        
        gap //= 2
    
    return arr`,
      javascript: `function shellSort(arr) {
    let n = arr.length;
    let gap = Math.floor(n / 2);
    
    while (gap > 0) {
        for (let i = gap; i < n; i++) {
            let temp = arr[i];
            let j = i;
            
            while (j >= gap && arr[j - gap] > temp) {
                arr[j] = arr[j - gap];
                j -= gap;
            }
            
            arr[j] = temp;
        }
        gap = Math.floor(gap / 2);
    }
    return arr;
}`,
      java: `public class ShellSort {
    public static void shellSort(int[] arr) {
        int n = arr.length;
        int gap = n / 2;
        
        while (gap > 0) {
            for (int i = gap; i < n; i++) {
                int temp = arr[i];
                int j = i;
                
                while (j >= gap && arr[j - gap] > temp) {
                    arr[j] = arr[j - gap];
                    j -= gap;
                }
                
                arr[j] = temp;
            }
            gap /= 2;
        }
    }
}`,
    },
  },
  {
    id: "depth-first-search",
    name: "Depth-First Search",
    category: "Graph",
    subcategory: "Graph Traversal",
    description: "A graph traversal algorithm that explores as far as possible along each branch before backtracking.",
    timeComplexity: "O(V + E)",
    spaceComplexity: "O(V)",
    useCase: "Topological sorting, finding connected components, maze solving",
    code: {
      python: `def dfs(graph, start, visited=None):
    if visited is None:
        visited = set()
    visited.add(start)
    print(start, end=' ')
    
    for neighbor in graph[start]:
        if neighbor not in visited:
            dfs(graph, neighbor, visited)

# Example
graph = {
    'A': ['B', 'C'],
    'B': ['D'],
    'C': ['E'],
    'D': [],
    'E': []
}
dfs(graph, 'A')`,
      javascript: `function dfs(graph, start, visited = new Set()) {
    visited.add(start);
    console.log(start);
    
    for (const neighbor of graph[start]) {
        if (!visited.has(neighbor)) {
            dfs(graph, neighbor, visited);
        }
    }
}

// Example
const graph = {
    'A': ['B', 'C'],
    'B': ['D'],
    'C': ['E'],
    'D': [],
    'E': []
};
dfs(graph, 'A');`,
      java: `import java.util.*;

public class DFS {
    public static void dfs(Map<String, List<String>> graph, String start, Set<String> visited) {
        visited.add(start);
        System.out.print(start + " ");
        
        for (String neighbor : graph.getOrDefault(start, new ArrayList<>())) {
            if (!visited.contains(neighbor)) {
                dfs(graph, neighbor, visited);
            }
        }
    }
}`,
    },
  },
  {
    id: "breadth-first-search",
    name: "Breadth-First Search",
    category: "Graph",
    subcategory: "Graph Traversal",
    description:
      "A graph traversal algorithm that explores vertices in layers, visiting all neighbors before moving to the next level.",
    timeComplexity: "O(V + E)",
    spaceComplexity: "O(V)",
    useCase: "Shortest path in unweighted graphs, level-order traversal, social networks",
    code: {
      python: `from collections import deque

def bfs(graph, start):
    visited = set()
    queue = deque([start])
    visited.add(start)
    
    while queue:
        vertex = queue.popleft()
        print(vertex, end=' ')
        
        for neighbor in graph[vertex]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)

# Example
graph = {
    'A': ['B', 'C'],
    'B': ['D', 'E'],
    'C': ['F'],
    'D': [],
    'E': [],
    'F': []
}
bfs(graph, 'A')`,
      javascript: `function bfs(graph, start) {
    const visited = new Set();
    const queue = [start];
    visited.add(start);
    
    while (queue.length > 0) {
        const vertex = queue.shift();
        console.log(vertex);
        
        for (const neighbor of graph[vertex]) {
            if (!visited.has(neighbor)) {
                visited.add(neighbor);
                queue.push(neighbor);
            }
        }
    }
}`,
      java: `import java.util.*;

public class BFS {
    public static void bfs(Map<String, List<String>> graph, String start) {
        Set<String> visited = new HashSet<>();
        Queue<String> queue = new LinkedList<>();
        queue.add(start);
        visited.add(start);
        
        while (!queue.isEmpty()) {
            String vertex = queue.poll();
            System.out.print(vertex + " ");
            
            for (String neighbor : graph.getOrDefault(vertex, new ArrayList<>())) {
                if (!visited.contains(neighbor)) {
                    visited.add(neighbor);
                    queue.add(neighbor);
                }
            }
        }
    }
}`,
    },
  },
  {
    id: "dijkstra",
    name: "Dijkstra's Algorithm",
    category: "Graph",
    subcategory: "Shortest Path",
    description:
      "A greedy algorithm that finds the shortest path between nodes in a weighted graph with non-negative edge weights.",
    timeComplexity: "O((V + E) log V)",
    spaceComplexity: "O(V)",
    useCase: "GPS navigation, network routing, social networks shortest connection",
    code: {
      python: `import heapq
from collections import defaultdict

def dijkstra(graph, start):
    distances = {node: float('inf') for node in graph}
    distances[start] = 0
    pq = [(0, start)]
    
    while pq:
        current_dist, current_node = heapq.heappop(pq)
        
        if current_dist > distances[current_node]:
            continue
        
        for neighbor, weight in graph[current_node]:
            distance = current_dist + weight
            
            if distance < distances[neighbor]:
                distances[neighbor] = distance
                heapq.heappush(pq, (distance, neighbor))
    
    return distances`,
      javascript: `function dijkstra(graph, start) {
    const distances = {};
    const pq = [[0, start]];
    
    for (const node in graph) {
        distances[node] = Infinity;
    }
    distances[start] = 0;
    
    while (pq.length > 0) {
        pq.sort((a, b) => a[0] - b[0]);
        const [currentDist, currentNode] = pq.shift();
        
        if (currentDist > distances[currentNode]) continue;
        
        for (const [neighbor, weight] of graph[currentNode]) {
            const distance = currentDist + weight;
            if (distance < distances[neighbor]) {
                distances[neighbor] = distance;
                pq.push([distance, neighbor]);
            }
        }
    }
    return distances;
}`,
      java: `import java.util.*;

public class Dijkstra {
    public static Map<String, Integer> dijkstra(Map<String, List<int[]>> graph, String start) {
        Map<String, Integer> distances = new HashMap<>();
        PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> a[0] - b[0]);
        
        for (String node : graph.keySet()) {
            distances.put(node, Integer.MAX_VALUE);
        }
        distances.put(start, 0);
        pq.offer(new int[]{0, start.hashCode()});
        
        return distances;
    }
}`,
    },
  },
]
