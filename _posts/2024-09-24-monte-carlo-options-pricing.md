---
layout: post
title: Monte Carlo Options Pricing
date: 2024-09-24 00:00:00
description: Randomness
tags: math cs finance
categories: posts
related_posts: true
featured: true
---

The infamous Black-Scholes option pricerm perhaps the most stereotypical quant project one can have on their resume. As my first project in the field of quantitative finance, I figured I should at least do a little bit more than code up a number cruncher, so I decided to make a Monte Carlo options pricer instead (based on the Black-Scholes model). I may come to update this page later if I add more features to the options pricer.

## The Black-Scholes Equation
The <a href="https://en.wikipedia.org/wiki/Black–Scholes_equation">Black-Scholes equation</a>  in short predicts the price of a option based on a variety of factors, the most important of which are time and stock price. It works only for European markets where stocks cannot expire before maturity time, doesn't account for risk in the interest rate, and assumes the market changes follow geometric Brownian motion. For the purposes of this article, we will be focusing on the mathematics and computation of the call price, as put prices follow a symmetrical implementation. 

Let $$S,t,\mu,\sigma,K,T$$ denote the stock price, time since purchase (in days), risk-free interest rate, volatility, strike price (in same units as stock and call prices) and maturity time (in days) of the option. We wish to find the call price $$C$$ of an option given these variables, which we assume exists and is well-defined for all inputs ($$\mu,\sigma,T$$ are all constants, so $$C=C(S,t)$$). Per Ito's Lemma:

$$dC = \frac{\partial C}{\partial t}dt + \frac{\partial C}{\partial S}dS + \frac{1}{2}\frac{\partial^2 C}{\partial S^2}dS^2$$

Since the stock price follows geometric Brownian motion, we know $$dS = \mu Sdt + \sigma SdX$$ where X is a schocastic variable. Subsituting this in, we find:

$$dC = (\frac{\partial C}{\partial t} + \mu S\frac{\partial C}{\partial S} + \frac{1}{2}\sigma^2 S^2 \frac{\partial^2 C}{\partial S^2})dt + \sigma S\frac{\partial C}{\partial S}dX$$

Performing delta hedging ($$\Delta = -\frac{\partial C}{\partial S}$$), we find:

$$d(C+\Delta S) = (\frac{\partial C}{\partial t} + \frac{1}{2}\sigma^2 S^2 \frac{\partial^2 C}{\partial S^2})dt$$

Which when rearranged produces the Black-Scholes PDE. 

$$\frac{\partial C}{\partial t} + rS\frac{\partial C}{\partial S} + \frac{1}{2}\sigma^2 S^2 \frac{\partial^2 C}{\partial S^2} - rC = 0$$

Where $$0\leq t\leq T$$ and the boundary condition $$C(S, T) = \max(S_T - K, 0)$$ is applied. From here, we have a second order partial differential equation whose solution has been <a href="https://uregina.ca/~kozdron/Teaching/Regina/441Fall14/Notes/L26-27-Nov5.pdf">well studied</a>. What matters for us is that the solution to this PDE gives us:

$$C=N(d_1)S_t - N(d_2)Ke^{-rt}$$

$$d_2 = d_1 - \sigma\sqrt{t}$$

$$d_1 = \frac{\text{ln}\ \frac{S_0}{K} + (r^2 + \frac{\sigma^2}{2}t)}{\sigma\sqrt{t}}$$

Where $$N$$ is the cumulative distribution function of the normal distribution. A standard Black-Scholes option pricer would just plug numbers into the above formulas to spit out results, but we will utilize Monte Carlo methods as practice for future, more complicated models.

## Monte-Carlo
What exactly is Monte Carlo? Well, it's a famous casino in Monaco, but for the purposes of this article, it's a genre of techniques involving simulating a large amount of random runs and aggregating the results. For us, that translates to simulating call prices over many runs and averaging the payoff of the end prices. To do this, we have to translate the formula from the previous section into a run generator:

$$S_i(t) = S_0\cdot \text{exp}\ ((r^2 - \frac{1}{2}\sigma^2)t + \sigma\sqrt{t}Z_i) $$

$$C_0 = e^{-rT}\frac{1}{N}\sum_{i}^{N}\max{S_i(T) - K, 0}$$

$$P_0 = e^{-rT}\frac{1}{N}\sum_{i}^{N}\max{K - S_i(T), 0}$$

Where $$Z_i$$ is a series of normally distributed schocastic variables and $$N$$ is the number of runs. The implementation of this simulation is pretty straight forward from here on out, but if desired, the source code for my webste (in assets/js/posts/monte-carlo-options-pricing.js) contains the Javascript implementation I used for the visualizer below. Furthermore, a C++ implementation is on my options-pricer project, which can be found under the Projects tab in the navigation bar.

A visualization of a randomly generated stock price time series.

<div id="plot-0"></div>
<br>
<span class="slider-container">
    <span class="slider-label" class="slider-label">$$T:$$</span>
    <span class="slider-value" id="days-slider-value">0</span>
    <span>
        <input class="slider" id="days-slider" type="range" min="0" max="1825" value="0" step="1">
    </span>
</span>

<span class="slider-container">
    <span class="slider-label" class="slider-label">$$\mu:$$</span>
    <span class="slider-value" id="mean-slider-value">0</span>
    <span>
        <input class="slider" id="mean-slider" type="range" min="-1" max="1" value="0" step="0.01">
    </span>
</span>

<span class="slider-container">
    <span class="slider-label" class="slider-label">$$\sigma:$$</span>
    <span class="slider-value" id="sigma-slider-value">0</span>
    <span>
        <input class="slider" id="sigma-slider" type="range" min="0" max="1" value="0" step="0.01">
    </span>
</span>


And a visualization of averaging the payoff from $$N$$ randomly generated runs (the other variables are fixed for computational speed: $$T=100,\mu=15\%,\sigma=5\%$$).
<div id="plot-1"></div>
<br>
<span class="slider-container">
    <span class="slider-label" class="slider-label">$$N:$$</span>
    <span class="slider-value" id="traces-slider-value">0</span>
    <span>
        <input class="slider" id="traces-slider" type="range" min="0" max="100" value="0" step="1">
    </span>
</span>
<!-- <div>Average Call Price: <p id="mean-call-price"></p></div> -->
<script src='https://cdn.plot.ly/plotly-2.4.2.min.js'></script>
<script src="/assets/js/posts/monte-carlo-options-pricing.js"></script>