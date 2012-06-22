```
   _________________                _     _             _
  | ____________    /              | \   | |           | |
  |'           /   /               |  \  | |           | |
              /   /    ||          |   \ | |_   _ ____ | |_   ___  _ __
             /   /  ___||___       | |\ \| | | | |    \|   \ / _ \| '__|
            /   /   ———  ———       | | \   | |_| | | | | () |  __/| |
           /   /       ||          |_|  \__|\___/|_|_|_|\__/ \____|_|
          /   /        ||                                                        
         /   /                       _____           _       _
        /   /                       / ____|         (_)     | |
       /   /                       | (___   ___ _ __ _ _ __ | |_
      /   /                         \___ \ / __| '__| | '_ \| __|
     /   /                          ____) | (__| |  | | |_) | |_
    /   /                          |_____/ \___|_|  |_| .__/ \__|
   /   /___________,|                                 | |
  /_________________|                                 |_|

```

NumberScript is a little language that compiles into JavaScript.

NumberScript is mathematically proven to be the most readable possible
language.

* No semicolons
* No significant whitespace
* No operators or any sort (unreadable line noise otherwise)
* [Hindu-arabic](https://en.wikipedia.org/wiki/Hindu-Arabic_numeral_system)
base 10 numerals only. All other bases are completely inferior.

Just install the number-script package from [npm](http://npmjs.org):

```
$ npm install -g number-script
```

Now we can write our first script. Here's the canonical "hello world" example:

```
40905301228267528480763326062211523871483805094662216066584226058
```

Now to run our script, just do:

```
$ number-script hello.number
hello world
```

You can use NumberScript interactively too. Just type `number-script`:

```
$ number-script
> 3287859
5
> 41568140212747864206438434
'beep boop'
> 12345
9
```

Valid numbers will compile to javascript. 
Fortunately, infinitely many such numbers exist.
Unfortunately, infinitely many numbers will not compile to javascript.

It's your job as a NumberScript programmer to find valid numbers and publish
them to [npm](http://npmjs.org).

To compile a valid number to javascript, just do:

```
$ number-script -c hello.number 
console.log('hello world')
```

Hideous output I know, but browsers can read these unreadable so-called
"java scripts".

Similarly, you can decompile one of these unreadable "java scripts" into a much
more readable, mathematically pure form:

```
$ number-script -d sieve.js
313728431476359218749465799978451129849377122645944385348705375623764666928684517163074487514048725159653957900348544988852863446634262989379566174294643880017574318570410806641619205452018736139212197462777647926850987466788257890628960701546633910224743641854799319425751791333186236736312364632936328914089827632718364967485873161671732059332866440444642844620451940872697334204912325465570367343801665620320696572162576006674688745967855613928221743028376858404509522230538
```

NumberScript also comes with advanced error detection, unlike some other
JavaScript transpilers. For instance, if you try to run or compile a number that
is not contained in the set of all valid NumberScript numbers, the compiler will
helpfully tell you:

```
Invalid number.
```

This is the only error message necessary.

At any rate you should prove your programs correct and submit them for peer
review before you actually run them.

This NumberScript program generates the set of all valid NumberScript programs,
including itself:

```
1040373210433699691193865329524183556214183570182404476078866878959475479620524091812801363920157026908689228352361184604985510309057624332534879638971639016747115829663280762507931175077429081199497278029806863880544590547595554549517077499129255853723219738481734479041365805300368592800556158057673664844046209490809625169051265103210038414771721579327949221307923633573065831629611481826467890128849771862085925746196997347168921887150823939084241518237460739827789727554430993346170559177415804333419925437671069162481695772572651421008415172120226226407926894276449987451751124594775330139599887696041470592175116951023273264384695149904824123684410396222829116737435799885829941044748930337468211795356682222052580221252513024972508142878788499185971993857222856318329836820243421862799826951503114
```

usage
=====

```
Usage: number-script [options] path/to/script.number

  -c, --compile      compile to JavaScript
  -d, --decompile    decompile JavaScript back to NumberScript
  -i, --interactive  run an interactive NumberScript REPL
  -o, --output       set a file to output to ("-" goes to stdout)
  -v, --version      display NumberScript version
  -h, --help         display this message

  -b, --base         specifies the base to use for the code, defaults to 10
  
```

license
=======

MIT
