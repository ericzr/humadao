import svgPaths from "./svg-ffyyksopf6";

function Heading() {
  return (
    <div className="content-stretch flex h-[35.998px] items-start relative shrink-0 w-full" data-name="Heading 1">
      <p className="flex-[1_0_0] font-['Inter:Bold','Noto_Sans_SC:Bold','Noto_Sans_JP:Bold',sans-serif] font-bold leading-[36px] min-h-px min-w-px not-italic relative text-[#1e2939] text-[30px] text-center tracking-[0.3955px]">Logo 动画展示</p>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="h-[23.999px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="-translate-x-1/2 absolute font-['Inter:Regular','Noto_Sans_JP:Regular','Noto_Sans_SC:Regular',sans-serif] font-normal leading-[24px] left-[206.5px] not-italic text-[#4a5565] text-[16px] text-center top-[-0.66px] tracking-[-0.3125px] whitespace-nowrap">所有版本均带有相同的韵律旋转动画 · 包含浅色和深色主题</p>
    </div>
  );
}

function Container() {
  return (
    <div className="h-[67.997px] relative shrink-0 w-[412.758px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[8px] items-start relative size-full">
        <Heading />
        <Paragraph />
      </div>
    </div>
  );
}

function Heading1() {
  return (
    <div className="h-[27.999px] relative shrink-0 w-full" data-name="Heading 2">
      <p className="-translate-x-1/2 absolute font-['Inter:Semi_Bold','Noto_Sans_JP:Bold',sans-serif] font-semibold leading-[28px] left-[572.28px] not-italic text-[#364153] text-[20px] text-center top-[-0.24px] tracking-[-0.4492px] whitespace-nowrap">中文版 Logo</p>
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="h-[19.999px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[572.99px] not-italic text-[#6a7282] text-[14px] text-center top-[0.76px] tracking-[-0.1504px] whitespace-nowrap">{`Chinese Version · Light & Dark`}</p>
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[55.997px] items-start relative shrink-0 w-full" data-name="Container">
      <Heading1 />
      <Paragraph1 />
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="h-[15.999px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="-translate-x-1/2 absolute font-['Inter:Regular','Noto_Sans_JP:Regular','Noto_Sans_SC:Regular',sans-serif] font-normal leading-[16px] left-[281.06px] not-italic text-[#6a7282] text-[12px] text-center top-[0.59px] whitespace-nowrap">浅色主题 (Light Theme)</p>
    </div>
  );
}

function Group() {
  return (
    <div className="absolute contents inset-0" data-name="Group">
      <div className="absolute inset-[0_72.2%_0_0]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 138.992 145.152">
          <path d={svgPaths.p2c648e80} fill="var(--fill-0, #040000)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[13.05%_44.07%_21.19%_35.35%]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 102.884 95.4464">
          <path d={svgPaths.p147bc4c0} fill="var(--fill-0, #231815)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[13.05%_21.7%_20.58%_58%]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 101.468 96.3386">
          <path d={svgPaths.p2b3cfc80} fill="var(--fill-0, #231815)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[8.82%_0_20.27%_81.76%]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 91.2079 102.924">
          <path d={svgPaths.p15785d80} fill="var(--fill-0, #231815)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Icon() {
  return (
    <div className="h-[145.146px] relative shrink-0 w-full" data-name="Icon">
      <Group />
    </div>
  );
}

function AnimatedLogo() {
  return (
    <div className="content-stretch flex flex-col h-[145.146px] items-start relative shrink-0 w-full" data-name="AnimatedLogo">
      <Icon />
    </div>
  );
}

function Container5() {
  return (
    <div className="bg-white h-[209.143px] relative rounded-[16px] shadow-[0px_20px_25px_0px_rgba(0,0,0,0.1),0px_8px_10px_0px_rgba(0,0,0,0.1)] shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col items-start pl-[31.998px] pr-[28.356px] pt-[31.998px] relative size-full">
        <AnimatedLogo />
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[11.999px] h-[237.142px] items-start left-0 top-0 w-[560.348px]" data-name="Container">
      <Paragraph2 />
      <Container5 />
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="h-[15.999px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="-translate-x-1/2 absolute font-['Inter:Regular','Noto_Sans_JP:Regular','Noto_Sans_SC:Regular',sans-serif] font-normal leading-[16px] left-[280.61px] not-italic text-[#d1d5dc] text-[12px] text-center top-[0.59px] whitespace-nowrap">深色主题 (Dark Theme)</p>
    </div>
  );
}

function Group1() {
  return (
    <div className="absolute contents inset-0" data-name="Group">
      <div className="absolute inset-[0_72.2%_0_0]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 138.992 145.152">
          <path d={svgPaths.p2c648e80} fill="var(--fill-0, white)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[13.05%_44.07%_21.19%_35.35%]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 102.884 95.4464">
          <path d={svgPaths.p147bc4c0} fill="var(--fill-0, white)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[13.05%_21.7%_20.58%_58%]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 101.468 96.3386">
          <path d={svgPaths.p2b3cfc80} fill="var(--fill-0, white)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[8.82%_0_20.27%_81.76%]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 91.2079 102.924">
          <path d={svgPaths.p15785d80} fill="var(--fill-0, white)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Icon1() {
  return (
    <div className="h-[145.146px] relative shrink-0 w-full" data-name="Icon">
      <Group1 />
    </div>
  );
}

function AnimatedLogoDark() {
  return (
    <div className="content-stretch flex flex-col h-[145.146px] items-start relative shrink-0 w-full" data-name="AnimatedLogoDark">
      <Icon1 />
    </div>
  );
}

function Container7() {
  return (
    <div className="h-[209.143px] relative rounded-[16px] shadow-[0px_20px_25px_0px_rgba(0,0,0,0.1),0px_8px_10px_0px_rgba(0,0,0,0.1)] shrink-0 w-full" data-name="Container" style={{ backgroundImage: "linear-gradient(159.533deg, rgb(16, 24, 40) 0%, rgb(30, 41, 57) 100%)" }}>
      <div className="content-stretch flex flex-col items-start pl-[31.998px] pr-[28.356px] pt-[31.998px] relative size-full">
        <AnimatedLogoDark />
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[11.999px] h-[237.142px] items-start left-[584.35px] top-0 w-[560.348px]" data-name="Container">
      <Paragraph3 />
      <Container7 />
    </div>
  );
}

function Container3() {
  return (
    <div className="h-[237.142px] relative shrink-0 w-full" data-name="Container">
      <Container4 />
      <Container6 />
    </div>
  );
}

function Container1() {
  return (
    <div className="h-[317.138px] relative shrink-0 w-[1144.696px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[23.999px] items-start relative size-full">
        <Container2 />
        <Container3 />
      </div>
    </div>
  );
}

function Heading2() {
  return (
    <div className="h-[27.999px] relative shrink-0 w-full" data-name="Heading 2">
      <p className="-translate-x-1/2 absolute font-['Inter:Semi_Bold','Noto_Sans_JP:Bold',sans-serif] font-semibold leading-[28px] left-[572.28px] not-italic text-[#364153] text-[20px] text-center top-[-0.24px] tracking-[-0.4492px] whitespace-nowrap">英文版 Logo</p>
    </div>
  );
}

function Paragraph4() {
  return (
    <div className="h-[19.999px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[572.8px] not-italic text-[#6a7282] text-[14px] text-center top-[0.76px] tracking-[-0.1504px] whitespace-nowrap">{`English Version · Light & Dark`}</p>
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[55.997px] items-start relative shrink-0 w-full" data-name="Container">
      <Heading2 />
      <Paragraph4 />
    </div>
  );
}

function Paragraph5() {
  return (
    <div className="h-[15.999px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="-translate-x-1/2 absolute font-['Inter:Regular','Noto_Sans_JP:Regular','Noto_Sans_SC:Regular',sans-serif] font-normal leading-[16px] left-[281.06px] not-italic text-[#6a7282] text-[12px] text-center top-[0.59px] whitespace-nowrap">浅色主题 (Light Theme)</p>
    </div>
  );
}

function Group2() {
  return (
    <div className="absolute contents inset-0" data-name="Group">
      <div className="absolute inset-[0_76.12%_0_0]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 131.36 137.179">
          <path d={svgPaths.p29b65f00} fill="var(--fill-0, #040000)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[17.82%_61.65%_25.23%_29.3%]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 49.7645 78.125">
          <path d={svgPaths.p219b49f2} fill="var(--fill-0, #231815)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[28.59%_52.83%_25.31%_39.87%]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40.1566 63.238">
          <path d={svgPaths.p64e6a00} fill="var(--fill-0, #231815)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[17.89%_42.22%_25.39%_48.6%]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 50.5071 77.8079">
          <path d={svgPaths.p4f41a00} fill="var(--fill-0, #231815)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[25.55%_33.25%_25.24%_58.94%]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 42.9221 67.5157">
          <path d={svgPaths.p290fea00} fill="var(--fill-0, #231815)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[17.89%_19.78%_25.16%_71.16%]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 49.8728 78.1212">
          <path d={svgPaths.p1d5608b0} fill="var(--fill-0, #231815)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[17.81%_10.32%_25.24%_80.65%]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 49.6562 78.1173">
          <path d={svgPaths.p2e142a00} fill="var(--fill-0, #231815)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[17.89%_0_25.31%_90.8%]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 50.6115 77.9084">
          <path d={svgPaths.p3a588b00} fill="var(--fill-0, #231815)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Icon2() {
  return (
    <div className="h-[137.174px] relative shrink-0 w-full" data-name="Icon">
      <Group2 />
    </div>
  );
}

function AnimatedLogoEnglish() {
  return (
    <div className="content-stretch flex flex-col h-[137.174px] items-start relative shrink-0 w-full" data-name="AnimatedLogoEnglish">
      <Icon2 />
    </div>
  );
}

function Container12() {
  return (
    <div className="bg-white h-[201.171px] relative rounded-[16px] shadow-[0px_20px_25px_0px_rgba(0,0,0,0.1),0px_8px_10px_0px_rgba(0,0,0,0.1)] shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col items-start pl-[31.998px] pr-[-21.647px] pt-[31.998px] relative size-full">
        <AnimatedLogoEnglish />
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[11.999px] h-[229.17px] items-start left-0 top-0 w-[560.348px]" data-name="Container">
      <Paragraph5 />
      <Container12 />
    </div>
  );
}

function Paragraph6() {
  return (
    <div className="h-[15.999px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="-translate-x-1/2 absolute font-['Inter:Regular','Noto_Sans_JP:Regular','Noto_Sans_SC:Regular',sans-serif] font-normal leading-[16px] left-[280.61px] not-italic text-[#d1d5dc] text-[12px] text-center top-[0.59px] whitespace-nowrap">深色主题 (Dark Theme)</p>
    </div>
  );
}

function Group3() {
  return (
    <div className="absolute contents inset-0" data-name="Group">
      <div className="absolute inset-[0_76.12%_0_0]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 131.36 137.179">
          <path d={svgPaths.p29b65f00} fill="var(--fill-0, white)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[17.82%_61.65%_25.23%_29.3%]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 49.7645 78.125">
          <path d={svgPaths.p219b49f2} fill="var(--fill-0, white)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[28.59%_52.83%_25.31%_39.87%]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40.1566 63.238">
          <path d={svgPaths.p64e6a00} fill="var(--fill-0, white)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[17.89%_42.22%_25.39%_48.6%]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 50.5071 77.8079">
          <path d={svgPaths.p4f41a00} fill="var(--fill-0, white)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[25.55%_33.25%_25.24%_58.94%]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 42.9221 67.5157">
          <path d={svgPaths.p290fea00} fill="var(--fill-0, white)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[17.89%_19.78%_25.16%_71.16%]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 49.8728 78.1212">
          <path d={svgPaths.p1d5608b0} fill="var(--fill-0, white)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[17.81%_10.32%_25.24%_80.65%]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 49.6562 78.1173">
          <path d={svgPaths.p2e142a00} fill="var(--fill-0, white)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[17.89%_0_25.31%_90.8%]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 50.6115 77.9084">
          <path d={svgPaths.p3a588b00} fill="var(--fill-0, white)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Icon3() {
  return (
    <div className="h-[137.174px] relative shrink-0 w-full" data-name="Icon">
      <Group3 />
    </div>
  );
}

function AnimatedLogoEnglishDark() {
  return (
    <div className="content-stretch flex flex-col h-[137.174px] items-start relative shrink-0 w-full" data-name="AnimatedLogoEnglishDark">
      <Icon3 />
    </div>
  );
}

function Container14() {
  return (
    <div className="h-[201.171px] relative rounded-[16px] shadow-[0px_20px_25px_0px_rgba(0,0,0,0.1),0px_8px_10px_0px_rgba(0,0,0,0.1)] shrink-0 w-full" data-name="Container" style={{ backgroundImage: "linear-gradient(160.251deg, rgb(16, 24, 40) 0%, rgb(30, 41, 57) 100%)" }}>
      <div className="content-stretch flex flex-col items-start pl-[31.998px] pr-[-21.647px] pt-[31.998px] relative size-full">
        <AnimatedLogoEnglishDark />
      </div>
    </div>
  );
}

function Container13() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[11.999px] h-[229.17px] items-start left-[584.35px] top-0 w-[560.348px]" data-name="Container">
      <Paragraph6 />
      <Container14 />
    </div>
  );
}

function Container10() {
  return (
    <div className="h-[229.17px] relative shrink-0 w-full" data-name="Container">
      <Container11 />
      <Container13 />
    </div>
  );
}

function Container8() {
  return (
    <div className="h-[309.166px] relative shrink-0 w-[1144.696px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[23.999px] items-start relative size-full">
        <Container9 />
        <Container10 />
      </div>
    </div>
  );
}

function Heading3() {
  return (
    <div className="h-[27.999px] relative shrink-0 w-full" data-name="Heading 2">
      <p className="-translate-x-1/2 absolute font-['Inter:Semi_Bold','Noto_Sans_SC:Bold','Noto_Sans_JP:Bold',sans-serif] font-semibold leading-[28px] left-[572.85px] not-italic text-[#364153] text-[20px] text-center top-[-0.24px] tracking-[-0.4492px] whitespace-nowrap">纯图标版</p>
    </div>
  );
}

function Paragraph7() {
  return (
    <div className="h-[19.999px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[572.66px] not-italic text-[#6a7282] text-[14px] text-center top-[0.76px] tracking-[-0.1504px] whitespace-nowrap">{`Icon Only · Light & Dark`}</p>
    </div>
  );
}

function Container16() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[55.997px] items-start relative shrink-0 w-full" data-name="Container">
      <Heading3 />
      <Paragraph7 />
    </div>
  );
}

function Paragraph8() {
  return (
    <div className="h-[15.999px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="-translate-x-1/2 absolute font-['Inter:Regular','Noto_Sans_JP:Regular','Noto_Sans_SC:Regular',sans-serif] font-normal leading-[16px] left-[281.06px] not-italic text-[#6a7282] text-[12px] text-center top-[0.59px] whitespace-nowrap">浅色主题 (Light Theme)</p>
    </div>
  );
}

function Group4() {
  return (
    <div className="absolute contents inset-0" data-name="Group">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 249.99 261.077">
        <path d={svgPaths.p3246e300} fill="var(--fill-0, #040000)" id="Vector" />
      </svg>
    </div>
  );
}

function Icon4() {
  return (
    <div className="h-[261.068px] relative shrink-0 w-full" data-name="Icon">
      <Group4 />
    </div>
  );
}

function AnimatedLogoIcon() {
  return (
    <div className="absolute content-stretch flex flex-col h-[261.068px] items-start left-[155.18px] top-[32px] w-[249.993px]" data-name="AnimatedLogoIcon">
      <Icon4 />
    </div>
  );
}

function Container19() {
  return (
    <div className="bg-white h-[325.065px] relative rounded-[16px] shadow-[0px_20px_25px_0px_rgba(0,0,0,0.1),0px_8px_10px_0px_rgba(0,0,0,0.1)] shrink-0 w-full" data-name="Container">
      <AnimatedLogoIcon />
    </div>
  );
}

function Container18() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[11.999px] h-[353.063px] items-start left-0 top-0 w-[560.348px]" data-name="Container">
      <Paragraph8 />
      <Container19 />
    </div>
  );
}

function Paragraph9() {
  return (
    <div className="h-[15.999px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="-translate-x-1/2 absolute font-['Inter:Regular','Noto_Sans_JP:Regular','Noto_Sans_SC:Regular',sans-serif] font-normal leading-[16px] left-[280.61px] not-italic text-[#d1d5dc] text-[12px] text-center top-[0.59px] whitespace-nowrap">深色主题 (Dark Theme)</p>
    </div>
  );
}

function Group5() {
  return (
    <div className="absolute contents inset-0" data-name="Group">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 249.99 261.077">
        <path d={svgPaths.p3246e300} fill="var(--fill-0, white)" id="Vector" />
      </svg>
    </div>
  );
}

function Icon5() {
  return (
    <div className="h-[261.068px] relative shrink-0 w-full" data-name="Icon">
      <Group5 />
    </div>
  );
}

function AnimatedLogoIconDark() {
  return (
    <div className="absolute content-stretch flex flex-col h-[261.068px] items-start left-[155.18px] top-[32px] w-[249.993px]" data-name="AnimatedLogoIconDark">
      <Icon5 />
    </div>
  );
}

function Container21() {
  return (
    <div className="h-[325.065px] relative rounded-[16px] shadow-[0px_20px_25px_0px_rgba(0,0,0,0.1),0px_8px_10px_0px_rgba(0,0,0,0.1)] shrink-0 w-full" data-name="Container" style={{ backgroundImage: "linear-gradient(149.881deg, rgb(16, 24, 40) 0%, rgb(30, 41, 57) 100%)" }}>
      <AnimatedLogoIconDark />
    </div>
  );
}

function Container20() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[11.999px] h-[353.063px] items-start left-[584.35px] top-0 w-[560.348px]" data-name="Container">
      <Paragraph9 />
      <Container21 />
    </div>
  );
}

function Container17() {
  return (
    <div className="h-[353.063px] relative shrink-0 w-full" data-name="Container">
      <Container18 />
      <Container20 />
    </div>
  );
}

function Container15() {
  return (
    <div className="h-[433.059px] relative shrink-0 w-[1144.696px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[23.999px] items-start relative size-full">
        <Container16 />
        <Container17 />
      </div>
    </div>
  );
}

function Heading4() {
  return (
    <div className="h-[27.999px] relative shrink-0 w-full" data-name="Heading 2">
      <p className="-translate-x-1/2 absolute font-['Inter:Semi_Bold','Noto_Sans_JP:Bold','Noto_Sans_KR:Bold','Noto_Sans_SC:Bold',sans-serif] font-semibold leading-[28px] left-[572.83px] not-italic text-[#364153] text-[20px] text-center top-[-0.24px] tracking-[-0.4492px] whitespace-nowrap">尺寸对比 - 浅色主题</p>
    </div>
  );
}

function Paragraph10() {
  return (
    <div className="h-[19.999px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[573.1px] not-italic text-[#6a7282] text-[14px] text-center top-[0.76px] tracking-[-0.1504px] whitespace-nowrap">Size Comparison - Light Theme</p>
    </div>
  );
}

function Container23() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[55.997px] items-start relative shrink-0 w-full" data-name="Container">
      <Heading4 />
      <Paragraph10 />
    </div>
  );
}

function Paragraph11() {
  return (
    <div className="h-[15.999px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="-translate-x-1/2 absolute font-['Inter:Regular','Noto_Sans_JP:Regular',sans-serif] font-normal leading-[16px] left-[123.89px] not-italic text-[#6a7282] text-[12px] text-center top-[0.59px] whitespace-nowrap">大 (200px)</p>
    </div>
  );
}

function Group6() {
  return (
    <div className="absolute contents inset-0" data-name="Group">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 199.997 208.858">
        <path d={svgPaths.p330d8400} fill="var(--fill-0, #040000)" id="Vector" />
      </svg>
    </div>
  );
}

function Icon6() {
  return (
    <div className="h-[208.85px] relative shrink-0 w-full" data-name="Icon">
      <Group6 />
    </div>
  );
}

function AnimatedLogoIcon1() {
  return (
    <div className="content-stretch flex flex-col h-[208.85px] items-start relative shrink-0 w-full" data-name="AnimatedLogoIcon">
      <Icon6 />
    </div>
  );
}

function Container27() {
  return (
    <div className="bg-[#f9fafb] h-[256.848px] relative rounded-[10px] shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col items-start pt-[23.999px] px-[23.999px] relative size-full">
        <AnimatedLogoIcon1 />
      </div>
    </div>
  );
}

function Container26() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[11.999px] h-[284.847px] items-start left-[177.36px] top-0 w-[247.997px]" data-name="Container">
      <Paragraph11 />
      <Container27 />
    </div>
  );
}

function Paragraph12() {
  return (
    <div className="h-[15.999px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="-translate-x-1/2 absolute font-['Inter:Regular','Noto_Sans_JP:Regular',sans-serif] font-normal leading-[16px] left-[90.8px] not-italic text-[#6a7282] text-[12px] text-center top-[0.59px] whitespace-nowrap">中 (150px)</p>
    </div>
  );
}

function Group7() {
  return (
    <div className="absolute contents inset-0" data-name="Group">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 149.996 156.648">
        <path d={svgPaths.p2cef2e80} fill="var(--fill-0, #040000)" id="Vector" />
      </svg>
    </div>
  );
}

function Icon7() {
  return (
    <div className="h-[156.642px] relative shrink-0 w-full" data-name="Icon">
      <Group7 />
    </div>
  );
}

function AnimatedLogoIcon2() {
  return (
    <div className="content-stretch flex flex-col h-[156.642px] items-start relative shrink-0 w-full" data-name="AnimatedLogoIcon">
      <Icon7 />
    </div>
  );
}

function Container29() {
  return (
    <div className="bg-[#f9fafb] h-[188.641px] relative rounded-[10px] shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col items-start pt-[15.999px] px-[15.999px] relative size-full">
        <AnimatedLogoIcon2 />
      </div>
    </div>
  );
}

function Container28() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[11.999px] h-[216.64px] items-start left-[457.35px] top-[34.1px] w-[181.996px]" data-name="Container">
      <Paragraph12 />
      <Container29 />
    </div>
  );
}

function Paragraph13() {
  return (
    <div className="h-[15.999px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="-translate-x-1/2 absolute font-['Inter:Regular','Noto_Sans_JP:Regular',sans-serif] font-normal leading-[16px] left-[62.23px] not-italic text-[#6a7282] text-[12px] text-center top-[0.59px] whitespace-nowrap">小 (100px)</p>
    </div>
  );
}

function Group8() {
  return (
    <div className="absolute contents inset-0" data-name="Group">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 99.994 104.429">
        <path d={svgPaths.pc64de00} fill="var(--fill-0, #040000)" id="Vector" />
      </svg>
    </div>
  );
}

function Icon8() {
  return (
    <div className="h-[104.425px] relative shrink-0 w-full" data-name="Icon">
      <Group8 />
    </div>
  );
}

function AnimatedLogoIcon3() {
  return (
    <div className="content-stretch flex flex-col h-[104.425px] items-start relative shrink-0 w-full" data-name="AnimatedLogoIcon">
      <Icon8 />
    </div>
  );
}

function Container31() {
  return (
    <div className="bg-[#f9fafb] h-[128.424px] relative rounded-[10px] shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col items-start pt-[11.999px] px-[11.999px] relative size-full">
        <AnimatedLogoIcon3 />
      </div>
    </div>
  );
}

function Container30() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[11.999px] h-[156.423px] items-start left-[671.35px] top-[64.21px] w-[123.994px]" data-name="Container">
      <Paragraph13 />
      <Container31 />
    </div>
  );
}

function Paragraph14() {
  return (
    <div className="h-[15.999px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="-translate-x-1/2 absolute font-['Inter:Regular','Noto_Sans_JP:Regular',sans-serif] font-normal leading-[16px] left-[38.97px] not-italic text-[#6a7282] text-[12px] text-center top-[0.59px] whitespace-nowrap">迷你 (60px)</p>
    </div>
  );
}

function Group9() {
  return (
    <div className="absolute contents inset-0" data-name="Group">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 59.9964 62.6538">
        <path d={svgPaths.p24339100} fill="var(--fill-0, #040000)" id="Vector" />
      </svg>
    </div>
  );
}

function Icon9() {
  return (
    <div className="h-[62.651px] relative shrink-0 w-full" data-name="Icon">
      <Group9 />
    </div>
  );
}

function AnimatedLogoIcon4() {
  return (
    <div className="content-stretch flex flex-col h-[62.651px] items-start relative shrink-0 w-full" data-name="AnimatedLogoIcon">
      <Icon9 />
    </div>
  );
}

function Container33() {
  return (
    <div className="bg-[#f9fafb] h-[78.651px] relative rounded-[10px] shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col items-start pt-[8px] px-[8px] relative size-full">
        <AnimatedLogoIcon4 />
      </div>
    </div>
  );
}

function Container32() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[11.999px] h-[106.649px] items-start left-[827.34px] top-[89.09px] w-[75.996px]" data-name="Container">
      <Paragraph14 />
      <Container33 />
    </div>
  );
}

function Container25() {
  return (
    <div className="h-[284.847px] relative shrink-0 w-full" data-name="Container">
      <Container26 />
      <Container28 />
      <Container30 />
      <Container32 />
    </div>
  );
}

function Container24() {
  return (
    <div className="bg-white h-[348.844px] relative rounded-[16px] shadow-[0px_20px_25px_0px_rgba(0,0,0,0.1),0px_8px_10px_0px_rgba(0,0,0,0.1)] shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col items-start pt-[31.998px] px-[31.998px] relative size-full">
        <Container25 />
      </div>
    </div>
  );
}

function Container22() {
  return (
    <div className="h-[428.84px] relative shrink-0 w-[1144.696px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[23.999px] items-start relative size-full">
        <Container23 />
        <Container24 />
      </div>
    </div>
  );
}

function Heading5() {
  return (
    <div className="h-[27.999px] relative shrink-0 w-full" data-name="Heading 2">
      <p className="-translate-x-1/2 absolute font-['Inter:Semi_Bold','Noto_Sans_JP:Bold','Noto_Sans_KR:Bold','Noto_Sans_SC:Bold',sans-serif] font-semibold leading-[28px] left-[572.83px] not-italic text-[#364153] text-[20px] text-center top-[-0.24px] tracking-[-0.4492px] whitespace-nowrap">尺寸对比 - 深色主题</p>
    </div>
  );
}

function Paragraph15() {
  return (
    <div className="h-[19.999px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[572.74px] not-italic text-[#6a7282] text-[14px] text-center top-[0.76px] tracking-[-0.1504px] whitespace-nowrap">Size Comparison - Dark Theme</p>
    </div>
  );
}

function Container35() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[55.997px] items-start relative shrink-0 w-full" data-name="Container">
      <Heading5 />
      <Paragraph15 />
    </div>
  );
}

function Paragraph16() {
  return (
    <div className="h-[15.999px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="-translate-x-1/2 absolute font-['Inter:Regular','Noto_Sans_JP:Regular',sans-serif] font-normal leading-[16px] left-[123.89px] not-italic text-[#d1d5dc] text-[12px] text-center top-[0.59px] whitespace-nowrap">大 (200px)</p>
    </div>
  );
}

function Group10() {
  return (
    <div className="absolute contents inset-0" data-name="Group">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 199.997 208.858">
        <path d={svgPaths.p330d8400} fill="var(--fill-0, white)" id="Vector" />
      </svg>
    </div>
  );
}

function Icon10() {
  return (
    <div className="h-[208.85px] relative shrink-0 w-full" data-name="Icon">
      <Group10 />
    </div>
  );
}

function AnimatedLogoIconDark1() {
  return (
    <div className="content-stretch flex flex-col h-[208.85px] items-start relative shrink-0 w-full" data-name="AnimatedLogoIconDark">
      <Icon10 />
    </div>
  );
}

function Container39() {
  return (
    <div className="bg-[rgba(30,41,57,0.5)] h-[256.848px] relative rounded-[10px] shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col items-start pt-[23.999px] px-[23.999px] relative size-full">
        <AnimatedLogoIconDark1 />
      </div>
    </div>
  );
}

function Container38() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[12px] h-[284.847px] items-start left-[177.36px] top-0 w-[247.997px]" data-name="Container">
      <Paragraph16 />
      <Container39 />
    </div>
  );
}

function Paragraph17() {
  return (
    <div className="h-[15.999px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="-translate-x-1/2 absolute font-['Inter:Regular','Noto_Sans_JP:Regular',sans-serif] font-normal leading-[16px] left-[90.8px] not-italic text-[#d1d5dc] text-[12px] text-center top-[0.59px] whitespace-nowrap">中 (150px)</p>
    </div>
  );
}

function Group11() {
  return (
    <div className="absolute contents inset-0" data-name="Group">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 149.996 156.648">
        <path d={svgPaths.p2cef2e80} fill="var(--fill-0, white)" id="Vector" />
      </svg>
    </div>
  );
}

function Icon11() {
  return (
    <div className="h-[156.642px] relative shrink-0 w-full" data-name="Icon">
      <Group11 />
    </div>
  );
}

function AnimatedLogoIconDark2() {
  return (
    <div className="content-stretch flex flex-col h-[156.642px] items-start relative shrink-0 w-full" data-name="AnimatedLogoIconDark">
      <Icon11 />
    </div>
  );
}

function Container41() {
  return (
    <div className="bg-[rgba(30,41,57,0.5)] h-[188.641px] relative rounded-[10px] shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col items-start pt-[15.999px] px-[15.999px] relative size-full">
        <AnimatedLogoIconDark2 />
      </div>
    </div>
  );
}

function Container40() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[11.999px] h-[216.64px] items-start left-[457.35px] top-[34.1px] w-[181.996px]" data-name="Container">
      <Paragraph17 />
      <Container41 />
    </div>
  );
}

function Paragraph18() {
  return (
    <div className="h-[15.999px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="-translate-x-1/2 absolute font-['Inter:Regular','Noto_Sans_JP:Regular',sans-serif] font-normal leading-[16px] left-[62.23px] not-italic text-[#d1d5dc] text-[12px] text-center top-[0.59px] whitespace-nowrap">小 (100px)</p>
    </div>
  );
}

function Group12() {
  return (
    <div className="absolute contents inset-0" data-name="Group">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 99.994 104.429">
        <path d={svgPaths.pc64de00} fill="var(--fill-0, white)" id="Vector" />
      </svg>
    </div>
  );
}

function Icon12() {
  return (
    <div className="h-[104.425px] relative shrink-0 w-full" data-name="Icon">
      <Group12 />
    </div>
  );
}

function AnimatedLogoIconDark3() {
  return (
    <div className="content-stretch flex flex-col h-[104.425px] items-start relative shrink-0 w-full" data-name="AnimatedLogoIconDark">
      <Icon12 />
    </div>
  );
}

function Container43() {
  return (
    <div className="bg-[rgba(30,41,57,0.5)] h-[128.424px] relative rounded-[10px] shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col items-start pt-[12px] px-[11.999px] relative size-full">
        <AnimatedLogoIconDark3 />
      </div>
    </div>
  );
}

function Container42() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[11.999px] h-[156.423px] items-start left-[671.35px] top-[64.21px] w-[123.994px]" data-name="Container">
      <Paragraph18 />
      <Container43 />
    </div>
  );
}

function Paragraph19() {
  return (
    <div className="h-[15.999px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="-translate-x-1/2 absolute font-['Inter:Regular','Noto_Sans_JP:Regular',sans-serif] font-normal leading-[16px] left-[38.97px] not-italic text-[#d1d5dc] text-[12px] text-center top-[0.59px] whitespace-nowrap">迷你 (60px)</p>
    </div>
  );
}

function Group13() {
  return (
    <div className="absolute contents inset-0" data-name="Group">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 59.9964 62.6538">
        <path d={svgPaths.p24339100} fill="var(--fill-0, white)" id="Vector" />
      </svg>
    </div>
  );
}

function Icon13() {
  return (
    <div className="h-[62.651px] relative shrink-0 w-full" data-name="Icon">
      <Group13 />
    </div>
  );
}

function AnimatedLogoIconDark4() {
  return (
    <div className="content-stretch flex flex-col h-[62.651px] items-start relative shrink-0 w-full" data-name="AnimatedLogoIconDark">
      <Icon13 />
    </div>
  );
}

function Container45() {
  return (
    <div className="bg-[rgba(30,41,57,0.5)] h-[78.651px] relative rounded-[10px] shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col items-start pt-[8px] px-[8px] relative size-full">
        <AnimatedLogoIconDark4 />
      </div>
    </div>
  );
}

function Container44() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[11.999px] h-[106.649px] items-start left-[827.34px] top-[89.09px] w-[75.996px]" data-name="Container">
      <Paragraph19 />
      <Container45 />
    </div>
  );
}

function Container37() {
  return (
    <div className="h-[284.847px] relative shrink-0 w-full" data-name="Container">
      <Container38 />
      <Container40 />
      <Container42 />
      <Container44 />
    </div>
  );
}

function Container36() {
  return (
    <div className="h-[348.844px] relative rounded-[16px] shadow-[0px_20px_25px_0px_rgba(0,0,0,0.1),0px_8px_10px_0px_rgba(0,0,0,0.1)] shrink-0 w-full" data-name="Container" style={{ backgroundImage: "linear-gradient(163.052deg, rgb(16, 24, 40) 0%, rgb(30, 41, 57) 100%)" }}>
      <div className="content-stretch flex flex-col items-start pt-[31.998px] px-[31.998px] relative size-full">
        <Container37 />
      </div>
    </div>
  );
}

function Container34() {
  return (
    <div className="h-[428.84px] relative shrink-0 w-[1144.696px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[23.999px] items-start relative size-full">
        <Container35 />
        <Container36 />
      </div>
    </div>
  );
}

function Heading6() {
  return (
    <div className="h-[27.999px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['Inter:Semi_Bold','Noto_Sans_JP:Bold','Noto_Sans_SC:Bold',sans-serif] font-semibold leading-[28px] left-0 not-italic text-[#1c398e] text-[18px] top-[-0.07px] tracking-[-0.4395px] whitespace-nowrap">📦 使用说明</p>
    </div>
  );
}

function Paragraph20() {
  return (
    <div className="absolute h-[19.999px] left-0 top-0 w-[538.592px]" data-name="Paragraph">
      <p className="absolute font-['Inter:Semi_Bold','Noto_Sans_JP:Bold','Noto_Sans_SC:Bold',sans-serif] font-semibold leading-[20px] left-0 not-italic text-[#193cb8] text-[14px] top-[0.76px] tracking-[-0.1504px] whitespace-nowrap">浅色主题版本：</p>
    </div>
  );
}

function Paragraph21() {
  return (
    <div className="absolute h-[19.999px] left-0 top-[28px] w-[538.592px]" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular','Noto_Sans_JP:Regular',sans-serif] font-normal leading-[0] left-0 not-italic text-[#193cb8] text-[0px] text-[14px] top-[0.76px] tracking-[-0.1504px] whitespace-nowrap">
        <span className="leading-[20px]">{`• `}</span>
        <span className="font-['Inter:Bold','Noto_Sans_JP:Regular',sans-serif] font-bold leading-[20px]">AnimatedLogo</span>
        <span className="leading-[20px]">{` - 中文版 Logo（人道）`}</span>
      </p>
    </div>
  );
}

function Paragraph22() {
  return (
    <div className="absolute h-[19.999px] left-0 top-[48px] w-[538.592px]" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular','Noto_Sans_JP:Regular',sans-serif] font-normal leading-[0] left-0 not-italic text-[#193cb8] text-[0px] text-[14px] top-[0.76px] tracking-[-0.1504px] whitespace-nowrap">
        <span className="leading-[20px]">{`• `}</span>
        <span className="font-['Inter:Bold','Noto_Sans_JP:Regular',sans-serif] font-bold leading-[20px]">AnimatedLogoEnglish</span>
        <span className="leading-[20px]">{` - 英文版 Logo（HUMA DAO）`}</span>
      </p>
    </div>
  );
}

function Paragraph23() {
  return (
    <div className="absolute h-[19.999px] left-0 top-[68px] w-[538.592px]" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular','Noto_Sans_SC:Regular','Noto_Sans_JP:Regular',sans-serif] font-normal leading-[0] left-0 not-italic text-[#193cb8] text-[0px] text-[14px] top-[0.76px] tracking-[-0.1504px] whitespace-nowrap">
        <span className="leading-[20px]">{`• `}</span>
        <span className="font-['Inter:Bold','Noto_Sans_SC:Regular','Noto_Sans_JP:Regular',sans-serif] font-bold leading-[20px]">AnimatedLogoIcon</span>
        <span className="leading-[20px]">{` - 纯太极图标`}</span>
      </p>
    </div>
  );
}

function Container49() {
  return (
    <div className="absolute h-[87.996px] left-0 top-0 w-[538.592px]" data-name="Container">
      <Paragraph20 />
      <Paragraph21 />
      <Paragraph22 />
      <Paragraph23 />
    </div>
  );
}

function Paragraph24() {
  return (
    <div className="absolute h-[19.999px] left-0 top-0 w-[538.592px]" data-name="Paragraph">
      <p className="absolute font-['Inter:Semi_Bold','Noto_Sans_JP:Bold','Noto_Sans_SC:Bold',sans-serif] font-semibold leading-[20px] left-0 not-italic text-[#193cb8] text-[14px] top-[0.76px] tracking-[-0.1504px] whitespace-nowrap">深色主题版本：</p>
    </div>
  );
}

function Paragraph25() {
  return (
    <div className="absolute h-[19.999px] left-0 top-[28px] w-[538.592px]" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular','Noto_Sans_JP:Regular',sans-serif] font-normal leading-[0] left-0 not-italic text-[#193cb8] text-[0px] text-[14px] top-[0.76px] tracking-[-0.1504px] whitespace-nowrap">
        <span className="leading-[20px]">{`• `}</span>
        <span className="font-['Inter:Bold','Noto_Sans_JP:Regular',sans-serif] font-bold leading-[20px]">AnimatedLogoDark</span>
        <span className="leading-[20px]">{` - 中文版 Logo（反白）`}</span>
      </p>
    </div>
  );
}

function Paragraph26() {
  return (
    <div className="absolute h-[19.999px] left-0 top-[48px] w-[538.592px]" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular','Noto_Sans_JP:Regular',sans-serif] font-normal leading-[0] left-0 not-italic text-[#193cb8] text-[0px] text-[14px] top-[0.76px] tracking-[-0.1504px] whitespace-nowrap">
        <span className="leading-[20px]">{`• `}</span>
        <span className="font-['Inter:Bold','Noto_Sans_JP:Regular',sans-serif] font-bold leading-[20px]">AnimatedLogoEnglishDark</span>
        <span className="leading-[20px]">{` - 英文版 Logo（反白）`}</span>
      </p>
    </div>
  );
}

function Paragraph27() {
  return (
    <div className="absolute h-[19.999px] left-0 top-[68px] w-[538.592px]" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular','Noto_Sans_SC:Regular','Noto_Sans_JP:Regular',sans-serif] font-normal leading-[0] left-0 not-italic text-[#193cb8] text-[0px] text-[14px] top-[0.76px] tracking-[-0.1504px] whitespace-nowrap">
        <span className="leading-[20px]">{`• `}</span>
        <span className="font-['Inter:Bold','Noto_Sans_SC:Regular','Noto_Sans_JP:Regular',sans-serif] font-bold leading-[20px]">AnimatedLogoIconDark</span>
        <span className="leading-[20px]">{` - 纯太极图标（反白）`}</span>
      </p>
    </div>
  );
}

function Container50() {
  return (
    <div className="absolute h-[87.996px] left-[554.59px] top-0 w-[538.592px]" data-name="Container">
      <Paragraph24 />
      <Paragraph25 />
      <Paragraph26 />
      <Paragraph27 />
    </div>
  );
}

function Container48() {
  return (
    <div className="h-[87.996px] relative shrink-0 w-full" data-name="Container">
      <Container49 />
      <Container50 />
    </div>
  );
}

function Code() {
  return (
    <div className="absolute bg-[#dbeafe] h-[24.402px] left-[119.6px] rounded-[4px] top-[14.93px] w-[58.13px]" data-name="Code">
      <p className="absolute font-['Menlo:Regular',sans-serif] leading-[20px] left-[8px] not-italic text-[#193cb8] text-[14px] top-[2px] whitespace-nowrap">width</p>
    </div>
  );
}

function Code1() {
  return (
    <div className="absolute bg-[#dbeafe] h-[24.402px] left-[199.3px] rounded-[4px] top-[14.93px] w-[66.56px]" data-name="Code">
      <p className="absolute font-['Menlo:Regular',sans-serif] leading-[20px] left-[8px] not-italic text-[#193cb8] text-[14px] top-[2px] whitespace-nowrap">height</p>
    </div>
  );
}

function Paragraph28() {
  return (
    <div className="h-[37.17px] relative shrink-0 w-full" data-name="Paragraph">
      <div aria-hidden="true" className="absolute border-[#8ec5ff] border-solid border-t-[0.586px] inset-0 pointer-events-none" />
      <p className="absolute font-['Inter:Regular','Noto_Sans_JP:Regular','Noto_Sans_SC:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#193cb8] text-[14px] top-[17.34px] tracking-[-0.1504px] whitespace-nowrap">{`💡 所有组件都支持 `}</p>
      <Code />
      <p className="absolute font-['Inter:Regular','Noto_Sans_JP:Regular',sans-serif] font-normal leading-[20px] left-[177.73px] not-italic text-[#193cb8] text-[14px] top-[17.34px] tracking-[-0.1504px] whitespace-nowrap">{` 和 `}</p>
      <Code1 />
      <p className="absolute font-['Inter:Regular','Noto_Sans_JP:Regular','Noto_Sans_SC:Regular',sans-serif] font-normal leading-[20px] left-[265.86px] not-italic text-[#193cb8] text-[14px] top-[17.34px] tracking-[-0.1504px] whitespace-nowrap">{` 属性，可自由调整尺寸`}</p>
    </div>
  );
}

function Container47() {
  return (
    <div className="content-stretch flex flex-col gap-[15.999px] h-[141.165px] items-start relative shrink-0 w-full" data-name="Container">
      <Container48 />
      <Paragraph28 />
    </div>
  );
}

function Container46() {
  return (
    <div className="bg-[#eff6ff] h-[232.675px] relative rounded-[16px] shrink-0 w-[1144.696px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#bedbff] border-[1.757px] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[11.999px] items-start pb-[1.757px] pt-[25.756px] px-[25.756px] relative size-full">
        <Heading6 />
        <Container47 />
      </div>
    </div>
  );
}

export default function RotateIconWithRhythm() {
  return (
    <div className="content-stretch flex flex-col gap-[63.997px] items-center pt-[79.996px] relative size-full" data-name="Rotate Icon with Rhythm" style={{ backgroundImage: "linear-gradient(145.531deg, rgb(249, 250, 251) 0%, rgb(243, 244, 246) 100%), linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%)" }}>
      <Container />
      <Container1 />
      <Container8 />
      <Container15 />
      <Container22 />
      <Container34 />
      <Container46 />
    </div>
  );
}