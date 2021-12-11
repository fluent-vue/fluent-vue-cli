use clap::{App, Arg};

fn main() {
  let mut app = App::new("fluent-vue CLI")
    .about("CLI to export and import FTL translation messages from Vue SFC files")
    .subcommand(App::new("export")
      .about("Export ftl translation messages from Vue files")
      .arg(Arg::new("files")
        .value_name("PATTERN")
        .forbid_empty_values(true)));

  let matches = app.get_matches_mut();

  match matches.subcommand() {
    Some(("extract", sub_m)) => println!("extract"),
    _ => app.print_help().unwrap()
  }

  ()
}
