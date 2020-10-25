# Graph / Finite State Machine Designer

Update by [Traumweh](https://traumweh.tk) in 2020.
- State Types: State can be rectangles or ellipses, which get wider to fit increasing text
- Default Type: Checkbox under canvas switches between ellipse (default) and rectangle
- Mixed Types: State's type can be toggled independently
- Special characters: More sup-, superscript chars, useful chars like arrows, regex stuff and more

Update by [Markus Feng](https://markusfeng.com) in 2019.

Update by [Samuel Green](http://sa.muel.green/fsm/) in 2015.

Original by [Evan Wallace](http://madebyevan.com/fsm) in 2010 under the MIT license.

<br><br><br>

# Cheat-Sheet
## Control
| What | How |
| :--- | :-- |
| Add state | Double-click on canvas |
| Make accept state | Double-click on state |
| Toggle type of state | Left-click state and press ctrl |
| Add arrow | Shift-drag on canvas |
| Move something | Drag it around |
| Delete something | Left-click it and press Delete key |

## Typing
### Normalscript
| What | How | Example/Preview |
| :--- | :--- | :--: |
| Greek letters | Backslash before letter | $\backslash phi \rarr \phi$<br>$\backslash Phi \rarr \Phi$ |
| Arrows | `\rightarrow`<br>`\Rightarrow`<br>`\leftarrow`<br>`\Leftarrow` | ⭢<br>⇒<br>⭠<br>⇐ |
| Concatenation | `\circ`<br>`\plus` | ∘<br>⁺ |
| Set-Stuff | `\emptyset`<br>`\cup`<br>`\cap` | ∅<br>∪<br>∩ |
| Blank-Character | `\blank` | ␣ |
| Mark a char | `\mark` | <span style="color: #888">◌</span>&#2091; |

### Subscript
|What|How|Example|
|:---|:---|:--:|
| Numbers | Undersore before number | $x\_0 \rarr x_0$ |
| Latin letters<sup>[1]</sup> | Underscore before letter | $x\_a \rarr x_a$ |
| Greek letters<sup>[2]</sup> | Underscore + Questionmark before letter | $x\_?phi \rarr x_\phi$ |
| Math chars | `_+`<br>`_-`<br>`_=`<br>`_(`<br>`_)` | ₊<br>₋<br>₌<br>₍<br>₎ |

### Superscript
|What|How|Example|
|:---|:---|:--:|
| Numbers | Circumflex before number | $x\char`\^0 \rarr x^0$ |
| Latin letters<sup>[3]</sup> | Circumflex before letter | $x\char`\^a \rarr x^a; \quad x\char`\^A \rarr x^A$ |
| Greek letters<sup>[4]</sup> | Circumflex + Questionmark before letter | $x\char`\^?phi \rarr x^\phi; \quad x\char`\^?Phi \rarr x^\Phi$ |
| Math chars | `^+`<br>`^-`<br>`^=`<br>`^(`<br>`^)` | ⁺<br>⁻<br>⁼<br>⁽<br>⁾ |

<br><br><br>

---
<a name="latin1">[1]</a>: Supported subscript Latin letters: a, e, h, i, j, k, l, m, n, o, p, r, s, t, u, v, x, X, y

<a name="greek1">[2]</a>: Supported subscript Greek letters: beta, rho, phi

<a name="latin2">[3]</a>: Supported superscript Latin letters: a, A, b, B, c, C, d, D, e, E, f, F, g, G, h, H, i, I, j, J, k, K, l, L, m, M, n, N, o, O, p, P, r, R, s, S, t, T, u, U, v, V, w, W, x, X, y, Y, z, Z

<a name="greek2">[4]</a>: Supported superscript Greek letters: alpha, beta, gamma, delta, epsilon, theta, iota, phi, Phi