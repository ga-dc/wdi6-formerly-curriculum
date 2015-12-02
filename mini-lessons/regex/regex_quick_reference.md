# Quick Reference

(from Rubular.com)

| Pattern    | Description                                  |   | Pattern  | Description              |   | Pattern | Description    |
|------------|----------------------------------------------|---|----------|-------------|------------|---|---------|----------------|
| `[abc]`    | A single character of: a, b, or c            |   | `.`  | Any single character         |   | `(...)` | Capture everything enclosed |
| `[^abc]`   | Any single character except: a, b, or c      |   | `\s` | Any whitespace character     |   | `(a|b)` | a or b |
| `[a-z]`    | Any single character in the range a-z        |   | `\S` | Any non-whitespace character |   | `a?`    | Zero or one of a |
| `[a-zA-Z]` | Any single character in the range a-z or A-Z |   | `\d` | Any digit                    |   | `a*`    | Zero or more of a |
| `^`        | Start of line                                |   | `\D` | Any non-digit                |   | `a+`    | One or more of a |
| `$`        | End of line                                  |   | `\w` | Any word character (letter, number, underscore) |   | `a{3}`  | Exactly 3 of a |
| `\A`       | Start of string                              |   | `\W` | Any non-word character       |   | `a{3,}` | 3 or more of a |
| `\z`       | End of string                                |   | `\b` | Any word boundary            |   | `a{3,6}`| Between 3 and 6 of a |
| `\`        | Escape character.                            |

## flag options:
- `i` case insensitive
- `m` make dot match newlines
- `x` ignore whitespace in regex
- `o` perform #{...} substitutions only once
