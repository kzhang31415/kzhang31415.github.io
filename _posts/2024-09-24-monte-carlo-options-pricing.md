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

Hello

<div id="plot-0"></div>
<br>
<span class="slider-container">
    <span class="slider-label" class="slider-label">$$\mu:$$</span>
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

World

<script src='https://cdn.plot.ly/plotly-2.4.2.min.js'></script>
<script src="/assets/js/posts/monte-carlo-options-pricing.js"></script>