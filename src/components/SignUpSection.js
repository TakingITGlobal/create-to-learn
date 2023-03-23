import React,{useState} from 'react'
import Section from './Section'
import { makeStyles } from '@material-ui/core/styles'
import PageCarousel from './PageCarousel'
import { useTranslation } from 'react-i18next'
import { InputSearchView, InputSelectView, InputTextView, WindowView } from './OnboardingView'

const schools = ["Aglace Chapman Education Centre", "Ahgwahbuush Memorial School", "Alberni District Secondary School", "Alookie Elementary", "Angik School Paulatuk", "Aqsarniit IIinniarvik School", "Arnaqjuaq School", "Arviligruaq Illiniarvik", "Ataguttaaluk Elementary School", "Athabasca Denesuline Education Authority", "Atikameg School", "Atikokan (Northern Lakes) High School", "Attagoyuk Ilisavik", "Aurora Virtual School", "Beaver Brae Secondary School", "Bella Bella Community School", "Bernard Constant Community School", "Bimaychikamah School", "Cadotte Lake School", "Carcross Alternative Program", "Chief Julius School Fort McPherson", "Chief Matthews School", "Chief Paul Niditchie School", "Chief Simeon McKay Education Centre", "Chief Sunrise Education Centre", "Chief Zzeh Gittlit", "Christ the King Elementary School", "Connected North", "Connexions Nord à la maison", "Cortes Island School", "Crolancia Public School", "Crossroads School", "CSSC Mercier", "Deer Lake First Nation School", "Deh Gáh Elementary and Secondary School", "Dehcho Divisional Education Council", "Del Van Gorder", "Delores D. Echum Composite School", "Deninu School", "Diamond Jenness Secondary School", "Ditidaht Community School", "Donald Young School", "Dryden High School", "Ear Falls Public School", "East Three Elementary School", "East Three Secondary School", "École des Trois-Soleils", "École Émilie-Tremblay", "École Netagamiou School", "École Whitehorse Elementary School", "École Willie J. Happyjack Memorial School", "Eight Avenue Learning Centre", "Elijah Smith Elementary School", "Eliza Van Bibber School", "Ermineskin Elementary School", "Ermineskin Jr. High School", "Ermineskin Sr. High School", "Evergreen Public School", "Father Gamache Memorial School", "Father Megret Elementary School", "Father Megret High School", "Father Porte Memorial Dene School", "FH Collins Secondary School", "Fort Frances High School", "Francine J Wesley Secondary School", "Ge-Da-Gi-Binez", "Ghùch Tlâ Community School", "Gidgalang Kuuyas Naay Secondary School", "Gold River Secondary School", "Golden Horn Elementary", "Golden Learning Centre", "Grace Marie Swampy Memorial Primary School", "Grand Rapids School", "Grey Mountain Primary School", "Gudangaay Tlaats'gaa Naay Secondary School", "Helen Kalvak School", "Henry Coaster Memorial School", "Hidden Valley Elementary School", "Holy Family Elementary School", "Igloolik High School", "Ignace Public School", "Individual Learning Centre", "Inualthuyak School", "Inuglak School", "Inuksuit School", "Inuksuk High School", "Inuujaq School", "J.V. Clark School", "J.W. Walker", "Jack Hulland Elementary School", "Jimmy Hikok Ilihakvik", "Joamie Ilinniarvik School", "John Arnalukjuak High School", "Johnson Elementary School", "Jonah Amitnaaq Secondary School", "Kâpapâmahchakwêw - Wandering Spirit School", "Keethanow Elementary School", "Keewaytinook Internet High School (KIHS)", "Keewaywin School", "Kenojuak Cultural Centre", "Khàtìnas.àxh Community School", "Kiilinik High School", "Kikendaasogamig Elementary School", "Kikendawt Kinoomaadii Gamig - Dokis School", "Kluane Lake School", "KPDSB Virtual High School", "Kugluktuk High School", "Kullik Ilihakvik", "Kyuquot Elementary Secondary School", "Lawrence Wesley Education Centre", "Leo Ussak School", "Levi Angmak Elementary School", "Lillian Berg Public School", "Louisbull (Kisipatnahk) School", "Luke Mettaweskum School", "Łutsel K'e Dene School", "Maani Ulujuk Ilinniarvik", "Maaqtusiis Secondary School", "Mangilaluk School", "Martin McKay Memorial School", "Maskwacis Outreach School", "Matawa Education Center", "McCrosson-Tovell School", "Michikan Lake School", "Migisi Sahgaigan School", "Mine Centre School", "Montana (Meskanahk Ka-Nipa-Wit) School", "Moose Kerr School", "Naja Isabelle Home", "Nakasuk School", "Nanook School", "Nasivvik High School", "Native Sena School", "Nelnah Bessie John School", "Nestor Falls School", "Netsilik School", "Nipisihkopahk Secondary School", "Nisichawayasihk Neyo Ohtinwak Collegiate", "Nisto Awasisak Memorial School", "Northstar Community School", "NU Dept of Education", "Nuiyak Elementary School", "Nunavut Sivuniksavut", "Open Roads School", "Otetiskewin Kiskinwamahto-wekamik School", "Otitiskiwin Kiskinwahamatowikamk", "Our Lady of the Way School", "Paatsaali School", "Paul William Kaeser High School", "Pelican Falls First Nations High School", "Peter Pitseolak High School", "Piikani Nation Secondary School", "Porter Creek Secondary School", "Provider Training / Tests", "Qaqqalik School", "Qarmartalik School", "Qiqirtaq High School", "Qitiqliq Middle School", "Quluaq School", "Quqshuun Ilihakvik GH", "Rachel Arngnammaktiq School", "Rainy River District School Board", "Rainy River High School", "Red Lake District HS", "Red Lake-Madsen PS", "Riverview School", "Robert Moore School", "Robert Service School", "Ross River School", "RRDSB Virtual Elementary", "Sacred Heart School", "Sakatcheway Anishinabe School (Grassy Narrows)", "Sakku School", "Sam Pudlat Elementary School", "Samson (Nipisihkopahk) Elementary School", "Selkirk Elementary School", "Simon Alaittuq School", "Sioux Mountain Public School", "Sioux North High School", "Sivuniit Middle School", "Sk'aadgaa Naay Elementary School", "St. Elias Community School", "St. Elizabeth", "St. Francis of Assisi Catholic School", "St. Joseph's School", "St. Mary School", "St. Patrick's School", "St. Thomas Aquinas High School", "Sturgeon Creek Alternative Program", "Sturgeon Creek School", "Takhini Elementary", "Tantalus Community School", "Tusarvik School", "Tuugaalik High School", "Ucluelet Secondary School", "Ulaajuk School", "Umimmak School", "Valleyview Public School", "Victor Sammurtok School", "Victoria Linklater Memorial School", "Wabannutao Eeyou School", "Wasaho Cree Nation School", "Watson Lake Secondary School", "Yukon Department of Education", "Zeballos Elementary and Secondary School"]

const useStyles = makeStyles((theme) => ({
  container: {
    maxHeight: '100%',
    position:'relative',
    height: 'calc(100vh - 56px)',
    display: 'flex',
    flexDirection: 'column',
  }
}))

function SignUpSection(props) {
  const { t } = useTranslation()
  const classes = useStyles()
  const welcomeViews = 3

  const [active,setActive] = useState(0)
  const [curLength,setCurLength] = useState(welcomeViews+1)
  
  return (
    <Section
      bgColor={props.bgColor}
      size='auto'
      bgImage={props.bgImage}
      bgImageOpacity={props.bgImageOpacity}
      className={classes.container}
    >
        <PageCarousel split={welcomeViews} state={{active,setActive,curLength}}>
  
          {/* Welcome Pages */}
          
          <WindowView
            image="https://picsum.photos/780"
            text={t("onboarding.screen-1")}
          />
          <WindowView
            image="https://picsum.photos/660/860"
            text={t("onboarding.screen-2")}
          />
          <WindowView
            image="https://picsum.photos/860/660"
            text={t("onboarding.screen-3")}
          />

          {/* Input Views */}
          <InputSelectView
            value="fnmi"
            options={["Inuit","Métis","First Nations", "None of the above"]}
            state={{setActive,setCurLength}}
            multi
          />
          <InputSelectView
            value="language"
            options={["Cree", "Inuktitut", "Ojibwe", "English"]}
            state={{setActive,setCurLength}}
            multi
          />
          <InputTextView
            value="greeting"
            state={{setActive,setCurLength}}
          />
          <InputSearchView
            value="school"
            options={schools}
            state={{setActive,setCurLength}}
          />
          <InputSelectView
            value="interests"
            options={["Health & Well-being", "Writing", "Video & Film", "Visual Arts", "Game Design", "Drones", "Music", "Songwriting", "Photography", "Photoshop", "Web Design", "Entrepreneurship","Illustration", "Cultural Teachings"]}
            state={{setActive,setCurLength}}
            cols={2}
            multi
          />
        </PageCarousel>
    </Section>
  )
}

export default SignUpSection
