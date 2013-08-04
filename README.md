# Lessons Learned

I wasn't able to complete the third project in a reasonable amount of time. This was my first practical encounter with creating a language within a language. I did however spend quite a bit of time learning about parsers, parser generators, grammars, and lexers. I'm confident that given enough time, I'd eventually be able to complete this task. At my current experience level, this task has proved to be beyond my skill. However, here are some rudimentary things that I learned about the fundamentals of programming language creation:

1. Create a lexer that defines characters, or groups of characters, that are recognized by the language as important. These are referred to as tokens.
1. Create a grammar that recursively defines the permitted sequences of tokens defined in the lexer.
1. The grammar and lexer are then fed into a parser generator that creates a parser.
1. The parser can then generate what can be referred to as an abstract syntax tree.
  1. This AST is a tree that can be traversed and contains both the content of the program and metadata about the tokens and its content.
1. Using the AST, a complier can be written to use the AST's to evaluate and execute code.

For anyone who randomly finds this repo, don't take the above information as canonical.