---
title: UnityShader入门
description: 记录了UnityShader入门相关知识、案例的学习过程。
date: 2026-03-29
badge: 示例
tags: ["指南", "Markdown", "排版"]
draft: false
---

### 一、准备工作

1、首先，Unity3D里配置好UPR渲染管线，在包管理器里下载UPR相关包

2、项目里创建-渲染-UPR配置文件（通用渲染）.

然后出现 

-Asset.asset文件

-Asset_Renderer.asset文件

3、编辑-项目设置-图形-可编写脚本的渲染脚本设置

-选择刚创建的Asset.asset文件

∟_ 质量-选择质量配置-渲染管线资产-选择刚创建的Asset.asset文件-重复选择每种质量.


### 二、直接开始简单案例吧

1、创建shader文件,然后直接编辑吧(~~编什么？~~)假定我们要给一个球做着色器,命名为Ball_1.

这是一个最简单的纯色着色器。


~~~hlsl
Shader "Custom/Ball_1"
{
    Properties
    {
        _Color ("颜色", Color) = (1, 0.5, 0.8, 1)
    }
    SubShader
    {
        Tags { 
            "RenderType"="Opaque" 
            "RenderPipeline"="UniversalRenderPipeline" 
            "Queue"="Geometry" 
        }
        Pass
        {
            Name "ForwardLit"
            Tags { "LightMode" = "UniversalForward" }

            ZWrite On  
            ZTest LEqual

            HLSLPROGRAM
            #pragma vertex vert
            #pragma fragment frag
            #include "Packages/com.unity.render-pipelines.universal/ShaderLibrary/Core.hlsl"

            struct Attributes { float4 positionOS : POSITION; };
            struct Varyings { float4 positionCS : SV_POSITION; };

            float4 _Color;

            Varyings vert(Attributes IN)
            {
                Varyings OUT;
                OUT.positionCS = TransformObjectToHClip(IN.positionOS.xyz);
                return OUT;
            }

            float4 frag(Varyings IN) : SV_Target
            {
                return _Color;
            }
            ENDHLSL
        }
    }

    FallBack "Hidden/Universal Render Pipeline/FallbackError"
}
~~~
先别管什么原理,然后右键点击创建材质，然后应用给球。



