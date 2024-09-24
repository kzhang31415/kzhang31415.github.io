---
layout: post
title: Convergence in $$\mathbb{R}^{2}$$
date: 2024-02-05 00:00:00
description: Why do I see imaginary numbers?
tags: math
categories: posts
related_posts: true
---

If you've ever done competition math, you'll probably have encountered something similar to this problem before:

> A robot starts at the origin of the Cartesian plane facing the positive x-direction and moves in the following manner. At each timestep $$k$$, the robot moves $$k$$ units in the direction it is facing and then rotates an angle $$\theta$$ counterclockwise. Find the position of the robot after $$n$$ steps.

A similar type of problem appeared in the Ross Program's 2023 Application Set. Let's walk through the solution, and along the way, we'll encounter the main highlight of this post.

As with all problems, quantifying the problem statement will make the solution much clearer. Let $$p_{k}$$ be the position of the robot at timestep $$k$$ (so $$p_{0}=(0,0),\ p_{1}=(1,0),$$ etc). It's clear that the direction the robot faces after $$k$$ timesteps is $$(k-1)\theta$$. Then going by the problem description, we gain a recursive defition for $$p_{n},$$ which quickly turns into a summation formula once we repeatedly apply the recursive definition:

$$
\begin{align*}
p_{n} &= p_{n-1} + (n\cos((n-1)\theta), n\sin((n-1)\theta))\\
&\vdots\\
&=p_{0}+\sum_{k=1}^{n}(k\cos((k-1)\theta), k\sin((k-1)\theta))\\&=\sum_{k=1}^{n}(k\cos((k-1)\theta), k\sin((k-1)\theta))
\end{align*}
$$

If this is your first time seeing such a problem, you might ask yourself "how am I going to compute this?" Sure, you could plug the whole thing into WolframAlpha, but that's cheating (and when I first encountered this problem, Wolfram timed out on me). 

Here comes the star of this post: complex numbers.

To quickly summarize complex numbers for those of you who need a refresher, we essentially set $$i=\sqrt{-1}$$ and treat $$a+bi$$ as a 2D number along the $$1-i$$ plane, analogous to the point $$(a,b)$$ in $$\mathbb{R}^{2}.$$ The reason we introduce complex numbers is because of Euler's formula: $$e^{i\theta}=cos(\theta)+i\sin(\theta).$$ We can express points in $$\mathbb{R}^{2}$$ as singular variables which we can do algebra with.

To demonstrate what I mean, define $$z=e^{i\theta},$$ and let $$[p_{n}]$$ denote the analogous complex number to $$p_{n}$$. Note that per Euler's formula, our sum simplifies to:

$$
\begin{align*}
[p_{n}]&=\sum_{k=1}^{n}kz^{k-1}=\sum_{k=1}^{n}\frac{d}{dz}z^{k}=\frac{d}{dz}\sum_{k=1}^{n}z^{k}\\
&=\frac{d}{dz}\frac{z(z^{n}-1)}{z-1}=\frac{nz^{n+1}-(n+1)z^{n}+1}{(z-1)^{2}}
\end{align*}
$$

Just like that, we have a simple, closed form expression for what is basically $$p_{n},$$ the answer to the problem. To get rid of the pesky complex number at the bottom, we can multiply the numerator and denominator by the conjugate of $$(z-1)^{2}$$. Plugging in $$z=e^{i\theta}$$ gets us the formula in terms of $$n,\ \theta.$$ You could even compute the limit of this formula to see if and where the robot converges.

The first time I found this solution, I was blown away that we could compute the endpoint of such a complicated process with math. I thought I would need a computer for sure! But what fascinated me more was the technique of applying algebra to complex expressions, as if the techniques from algebra on real expressions carried over without exception. 

So, why does this work? It's primarily due to the fact that the deriative and the identity we used,

$$
\sum_{k=1}^{n}z^{k}=\frac{z(z^{n}-1)}{z-1}
$$

only depend on the linearity, distributivity, additive closure, and multiplicative closure of the algebraic structure we're working in. As fields, both $$\mathbb{R}$$ and $$\mathbb{C}$$ fufill those properties and more, meaning the algebraic identity carried over without exception from the reals to the complex numbers. Even better, we can apply that identity to any other number system or algebraic structure which has those properties (assuming the definition of exponentiation is analogous to how we defined it). Abstract algebra is beyond the scope of this post, though, so don't worry if you're reading this and don't know what a field is.

It's easy to see the applications. The solution to the problem could be applied to robotics, and physicists often use this technique to model oscillations, since computation becomes much simpler.

If math had a theme, it would be that everything is simple from the right perspective. The theme rings true here as well. From the initial perspective, the formula for $$p_{n}$$ looked like a mess that I wouldn't want to touch. Through a different perspective, it changes into a simple closed-form expression. Easy to see in hindsight, but evasive to first timers.

It's through moments like these that I'm reminded of the beauty of math. 