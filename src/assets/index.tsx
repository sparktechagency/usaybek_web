import about from "@/assets/static/about/about-img.svg";
import mission from "@/assets/static/about/mission.svg";
import story from "@/assets/static/about/story.svg";
import temp from "@/assets/static/about/temp.svg";
import choose from "@/assets/static/about/choose.svg";
import join from "@/assets/static/about/join.svg";
import tarams from "@/assets/static/tarams.svg";
import logo from "@/assets/logo.png";
import views from "@/assets/static/dashboard/views.svg";
import videos from "@/assets/static/dashboard/videos.svg";
import likes from "@/assets/static/dashboard/likes.svg";
import channel from "@/assets/static/contract/channel.svg"
import  promotion from "@/assets/static/contract/promotion.svg"
import release from "@/assets/static/contract/release.svg"
import youtube from "@/assets/static/contract/youtube.svg"
import sign from "@/assets/static/contract/sign.svg"
import onboarding from "@/assets/static/contract/onboarding.svg"
import launch from "@/assets/static/contract/launch.svg"


const assets = {
  logo,
  basic: {
    tarams,
    about: {
      about,
      mission,
      story,
      temp,
      choose,
      join,
    },
  },
  dashboard: {
    views,
    videos,
    likes,
  },
  contract: {
    channel,
    promotion,
    release,
    youtube,
    sign,
    onboarding,
    launch,
  }
};

export default assets;
